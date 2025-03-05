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
  errorImagen: boolean= false;
  productos: Producto[] = [];
  productosActivadosFiltrados: Producto[] = [];
  cargando: boolean = false;
  filtro: string = "";
  filtroTemporal: string = "";
  esExito: boolean = false;
  mensaje: string = "";
  e500: boolean = false
  ceroProductosFiltrados: boolean = false;
  productoActualizado: Producto = {
    idProducto: 1,
    nombre: "",
    precio: 0,
    stock: 0,
    estado: true,
    imagen: "",
    marca: "",
    modelo: "",
    categoria: { idCategoria: 1, nombre: "", estado: true }
  }
  categoria: Categoria[] = []
  constructor(public productosService: ProductosService, private mensajeSerive: MensajesService, private categoriaService: CategoriasService) { }


  ngOnInit(): void {
    this.mensajeSerive.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeSerive.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarProductos();
    this.cargarCategorias();
  }

  mostrarProductos(): void {
    this.cargando = true;
    this.e500 = false
    this.productos = [];

    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.cargando = false
        this.productos = data;
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

  buscador(): void {
    this.filtro = this.filtroTemporal.trim(); // Se actualiza solo al hacer submit
    this.productosActivadosFiltrados = this.productos?.filter(producto =>
      producto.estado && (
        producto.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        producto.marca.toLowerCase().includes(this.filtro.toLowerCase()) ||
        producto.modelo.toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
    this.ceroProductosFiltrados = this.productosActivadosFiltrados.length === 0;
  }
  productoSeleccionado(producto: Producto) {
    return this.productoActualizado = { ...producto }
  }
  actualizarProduto() {
    // this.productosService.actualizarP(id).subscribe({
    //   next: (value) => {

    //   },
    //   error: (err) => {

    //   }
    // })
  }
  cargarCategorias() {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categoria = data.filter((c) => c.estado)

      },
      error: (err) => {
        console.log("Error," + err)

      },
    })

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

  ponerStockCero(id: number) {
    this.productosService.stockCero(id).subscribe({
      next: () => {

        this.mostrarProductos();

      },
      error: (err) => {

      },
    })

  }

 
}
