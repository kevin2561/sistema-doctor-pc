import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entites/producto';
import { ProductosService } from '../../services/productos.service';
import { MensajesService } from '../../services/mensajes.service';
import { Categoria } from '../../entites/categoria';
import { CategoriasService } from '../../services/categorias.service';

// declare var bootstrap: any;


@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  // https://chatgpt.com/share/67cf740d-07ec-8003-a576-86ffb0cbff84
  errorImagen: boolean = false;
  productos: Producto[] = [];
  cargando: boolean = false;
  condicionSelect: string[] = ["Alternativo", "Nuevo", "Usado"];


  filtro: string = "";
  filtroTemporal: string = "";
  productosActivadosFiltrados: Producto[] = [];
  ceroProductosFiltrados: boolean = false;

  esExito: boolean = false;
  mensaje: string = "";
  e500: boolean = false
  productoActualizado: Producto = {
    idProducto: 1,
    nombre: "",
    precio: 0,
    stock: 0,
    estado: true,
    imagen: "",
    marca: "",
    modelo: "",
    categoria: { idCategoria: 0, nombre: "", estado: true } as Categoria // Inicializa con un objeto vacío
  }
  categoriaSelect: Categoria[] = []
  constructor(public productosService: ProductosService, private mensajeSerive: MensajesService, private categoriaService: CategoriasService) { }


  ngOnInit(): void {
    this.mensajeSerive.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeSerive.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarProductos();
    this.cargarCategorias();
  }
  buscador(): void {
    this.filtro = this.filtroTemporal.trim(); // Se actualiza solo al hacer submit
    this.productosActivadosFiltrados = this.productos?.filter(producto =>
      producto.estado && (
        producto.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        producto.marca.toLowerCase().includes(this.filtro.toLowerCase()) ||
        producto.modelo.toLowerCase().includes(this.filtro.toLowerCase()) ||
        producto.categoria?.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
    this.ceroProductosFiltrados = this.productosActivadosFiltrados.length === 0;
  }


  mostrarProductos(): void {
    this.cargando = true;
    this.e500 = false
    this.productos = [];

    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.cargando = false
        this.productos = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        // console.log(this.productos)
      },
      error: () => {
        this.e500 = true
        this.cargando = false
      }
    });

  }

  get productosActivados(): Producto[] {
    if (this.filtro.trim() !== "") { // Si hay búsqueda activa
      return this.productosActivadosFiltrados; // Devuelve el filtro (puede estar vacío)
    }
    return this.productos?.filter(p => p.estado); // Si no hay filtro, devuelve todos los activados
  }


  productoSeleccionado(producto: Producto): void {
    this.productoActualizado = { ...producto }
    const imagenInput = document.getElementById("formFile") as HTMLInputElement;
    if (imagenInput) {
      imagenInput.value = ""; // Limpia el input
    }

    // ...producto, categoria: producto.categoria ?? { idCategoria: 0, nombre: "", estado: true } // Garantizar un objeto válido
  }

  cargarCategorias() {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categoriaSelect = data.filter((c) => c.estado).sort((a, b) => a.nombre.localeCompare(b.nombre))
        // console.log("Categorías cargadas:", this.categoriaSelect);

      },
      error: (err) => {
        console.log("Error," + err)

      },
    })

  }

  actualizarProduto() {
    const id = this.productoActualizado.idProducto;
    const imagenInput = document.getElementById("formFile") as HTMLInputElement;
    const imagen = imagenInput.files?.length ? imagenInput.files[0] : null;
    // imagenInput.value=""; //Limpia el input
    this.productosService.actualizarP(id, this.productoActualizado, imagen || undefined).subscribe({
      next: (data) => {
        console.log(data)
        if (data == 0) {
          this.mensajeSerive.mostrarMensaje("Este Producto ya Existe", false);
          return;
        }
        this.mensajeSerive.mostrarMensaje(`Producto ${this.productoActualizado.nombre} actualizado`, true);
        this.mostrarProductos(); // Recargar productos
      },
      error: (err) => {
        console.error("Error al actualizar:", err);
        this.mensajeSerive.mostrarMensaje("Error al actualizar el producto", false);
      }
    });
  }
  desactivarProducto(id: number, nombre: string): void {
    this.productosService.desactivarP(id).subscribe({
      next: () => {
        this.mostrarProductos();
        this.mensajeSerive.mostrarMensaje(`El producto ${nombre.toUpperCase()} fue Desactivado Correctamente`, true);
      },
      error: (err) => {
        this.mensajeSerive.mostrarMensaje(`Error, No se pudo Desactivar el Producto  ${nombre.toUpperCase()}`, false);
        // console.error(err)


      },
    })
  }

  eliminarProducto(id: number, nombre: string) {
    if (window.confirm(`¿Esta seguro que quiere eliminar el Producto ${nombre}?`)) {
      this.productosService.eliminarP(id).subscribe({
        next: () => {
          this.mensajeSerive.mostrarMensaje(`Producto ${nombre} eliminado correctamente`, true)
          this.mostrarProductos();
        },
        error: () => {
          this.mensajeSerive.mostrarMensaje(`Error al eliminar, intento más tarde`, false)
        },
      })
    }
  }

  ponerStockCero(id: number, nombreP: string, event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento y evita recargas
    // console.log(id, "---------" + nombreP + "---------" + stocx)
    this.productosService.stockCero(id).subscribe({
      next: (respuesta) => {
        // console.log("Respuesta: ", respuesta)
        if (respuesta == 0) {
          this.mensajeSerive.mostrarMensaje(`El producto ${nombreP} ya está agotado.`, false);
        } else {
          this.mensajeSerive.mostrarMensaje(`El stock del producto ${nombreP} se ha actualizado a 0.`, true);
        }
        this.mostrarProductos();
      },
      error: (err) => {
        this.mensajeSerive.mostrarMensaje(`Error, Intentenlo más tarde`, false)
      },
    })
  }










}
