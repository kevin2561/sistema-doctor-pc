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
  errorImagen: boolean = false;
  productos: Producto[] = [];
  cargando: boolean = false;
  condicionSelect: string[] = ["Alternativo", "Nuevo", "Usado"];


  filtro: string = "";
  filtroTemporal: string = "";
  productosActivadosFiltrados: Producto[] = [];
  ceroProductosFiltrados: boolean = false;

  arrayFModelos: string[] = [];
  arrayFMarcas: string[] = [];
  arrayFCategorias: string[] = [];
  arrayFCondicion: string[] = [];
  filtroProductos = {
    "marca": null,
    "modelo": null,
    "categoria": null,
    "condicion": null
  }

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
    condicion: "",
    categoria: { idCategoria: 0, nombre: "", estado: true } as Categoria // Inicializa con un objeto vacío
  }
  categoriaSelect: Categoria[] = []
  productosBusquedaFiltrados: Producto[] = [];
  productosMultiFiltrados: Producto[] = [];


  constructor(public productosService: ProductosService, private mensajeSerive: MensajesService, private categoriaService: CategoriasService) { }


  ngOnInit(): void {
    this.mensajeSerive.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeSerive.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarProductos();
    this.cargarCategorias();
  }

  mostrarProductosIniciados(data: Producto[]) {
    // console.log(arrayCopiadoProductos)
    this.arrayFMarcas = Array.from(new Set(data.map(p => p.marca.trim()).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))))
    this.arrayFModelos = Array.from(new Set(data.map(p => p.modelo.trim()).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))))
    this.arrayFCondicion = Array.from(new Set(data.map(p => p.condicion.trim()).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))))
    this.arrayFCategorias = Array.from(new Set(data
      .filter(p => p.categoria && p.categoria.estado)
      .map(p => p.categoria!.nombre.trim())
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    ))

    console.log(this.arrayFMarcas)
    console.log(this.arrayFModelos)
    console.log(this.arrayFCondicion)
    console.log(this.arrayFCategorias)

  }
  buscador(): void {
    const busqueda = this.filtroTemporal.trim().toLowerCase();
    if (busqueda === "") {
      this.productosBusquedaFiltrados = [];
      this.ceroProductosFiltrados = false;

      return;
    }
    this.productosBusquedaFiltrados = this.productos.filter(producto => producto.estado &&
      producto.nombre.toLowerCase().includes(busqueda)
    );
    this.ceroProductosFiltrados = this.productosBusquedaFiltrados.length === 0;

  }



  mostrarProductos(): void {
    this.cargando = true;
    this.e500 = false
    this.productos = [];

    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        console.log(data)
        this.cargando = false
        this.mostrarProductosIniciados(data)
        this.productos = data.sort((a, b) => b.idProducto - a.idProducto);


        // console.log(this.productos)
      },
      error: () => {
        this.e500 = true
        this.cargando = false
      }
    });

  }

  get productosActivados(): Producto[] {
    if (this.filtroTemporal.trim() !== "") { // Si hay búsqueda activa
      return this.productosBusquedaFiltrados; // Devuelve el filtro (puede estar vacío)
    }
    if (this.filtroProductos.marca || this.filtroProductos.modelo || this.filtroProductos.condicion || this.filtroProductos.categoria) {
      return this.productosMultiFiltrados;
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
        // this.mostrarProductos(); // Recargar productos
        this.mostrarProductosConFiltro();

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
        // this.mostrarProductos();
        this.mensajeSerive.mostrarMensaje(`El producto ${nombre.toUpperCase()} fue Desactivado Correctamente`, true);
        this.mostrarProductosConFiltro();

      },
      error: (err) => {
        this.mensajeSerive.mostrarMensaje(`Error, No se pudo Desactivar el Producto  ${nombre.toUpperCase()}`, false);
        // console.error(err)


      },
    })
  }

  eliminarProducto() {
    const id = this.productoActualizado.idProducto;
    this.productosService.eliminarP(id).subscribe({
      next: () => {
        this.mensajeSerive.mostrarMensaje(`Producto ${this.productoActualizado.nombre.toUpperCase()} eliminado correctamente`, true)
        // this.mostrarProductos();
        this.mostrarProductosConFiltro();

      },
      error: () => {
        this.mensajeSerive.mostrarMensaje(`Error al eliminar, intento más tarde`, false)
      },
    })

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
        this.mostrarProductosConFiltro();
      },
      error: (err) => {
        this.mensajeSerive.mostrarMensaje(`Error, Intentenlo más tarde`, false)
      },
    })
  }


  filtrosProductos(): void {
    const f = this.filtroProductos;

    // Si no se selecciona nada, vaciamos el array (o podrías asignar todos)
    if (!f.marca && !f.modelo && !f.condicion && !f.categoria) {
      this.productosMultiFiltrados = [];
      this.ceroProductosFiltrados = false;

      return;
    }

    this.productosMultiFiltrados = this.productos.filter(producto => {
      let coincide = true;

      if (!producto.estado) {
        return false;
      }
      if (f.marca) {
        coincide = coincide && (producto.marca.trim() === f.marca);
      }
      if (f.modelo) {
        coincide = coincide && (producto.modelo.trim() === f.modelo);
      }
      if (f.condicion) {
        coincide = coincide && (producto.condicion.trim().toLowerCase() === f.condicion);
      }
      if (f.categoria) {
        coincide = coincide && (producto.categoria ? producto.categoria.nombre.trim() === f.categoria : false);
      }
      return coincide;
    });
    this.ceroProductosFiltrados = this.productosMultiFiltrados.length === 0;

  }

  mostrarTodosProductos(): void {
    // Reiniciar filtros
    this.filtroTemporal = "";
    this.filtroProductos = { marca: null, modelo: null, condicion: null, categoria: null };
    // Vaciar arrays filtrados
    this.productosBusquedaFiltrados = [];
    this.productosMultiFiltrados = [];
    // Ocultar mensaje de error
    this.ceroProductosFiltrados = false;
    // Recargar la lista completa (opcional, si la data puede cambiar)
    this.mostrarProductos();
  }

  reaplicarFiltro(): void {
    if (this.filtroTemporal.trim() !== "") {
      this.buscador();
    } else if (this.filtroProductos.marca || this.filtroProductos.modelo || this.filtroProductos.condicion || this.filtroProductos.categoria) {
      this.filtrosProductos();
    }
  }

  mostrarProductosConFiltro(): void {
    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.cargando = false;
        this.mostrarProductosIniciados(data);
        // Ordena o asigna la data según tu criterio (por ejemplo, por id descendente)
        this.productos = data.sort((a, b) => b.idProducto - a.idProducto);
        // Reaplicar el filtro activo, si hay alguno
        this.reaplicarFiltro();
      },
      error: () => {
        this.e500 = true;
        this.cargando = false;
      }
    });
  }



}
