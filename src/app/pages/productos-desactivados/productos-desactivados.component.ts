import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../entites/producto';
import { MensajesService } from '../../services/mensajes.service';
import { Categoria } from '../../entites/categoria';

@Component({
  selector: 'app-productos-desactivados',
  standalone: false,
  templateUrl: './productos-desactivados.component.html',
  styleUrls: ['./productos-desactivados.component.css']
})
export class ProductosDesactivadosComponent implements OnInit {
  productos: Producto[] = []
  mensaje: string = "";
  esExito: boolean = false;
  cargando: boolean = false;
  e500: boolean = false;
  productoSelect: Producto = {
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
  filtroTemporal: string= "";
  filtro: string= "";

  constructor(public productoService: ProductosService, private mensajeService: MensajesService) {

  }
  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarProductos();
  }

  productoSeleccionado(producto: Producto) {
    this.productoSelect = { ...producto }
  }

  mostrarProductos() {
    this.cargando = true
    this.e500 = false;
    this.productoService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data.sort((a, b) => a.nombre.localeCompare(b.nombre))
        setTimeout(() => {
          this.cargando = false
        }, 100)

      },
      error: (e) => {
        this.e500 = true;
        this.cargando = false



      }
    })
  }

  get pDesactivados(): Producto[] {
    return this.productos?.filter((p) => !p.estado)
  }

  activarProducto(id: number, nombre: string) {
    this.cargando = true;
    this.productoService.activarP(id).subscribe({
      next: () => {
        this.mostrarProductos();
        this.cargando = false;
        this.mensajeService.mostrarMensaje(`El producto ${nombre.toUpperCase()} fue activado correctamente`, true)
      },
      error: (e) => {
        console.error(e)
        this.cargando = false;
        this.mensajeService.mostrarMensaje(`Error al activar el producto ${nombre.toUpperCase()}`, false)
      }
    })
  }

  eliminarProductosDesactivados() {
    const id = this.productoSelect.idProducto;
    this.productoService.eliminarP(id).subscribe({
      next: () => {
        this.mensajeService.mostrarMensaje(`Producto ${this.productoSelect.nombre.toUpperCase()} eliminado correctamente`, true)
        this.mostrarProductos();
      },
      error: () => {
        this.mensajeService.mostrarMensaje(`Error al eliminar, intento más tarde`, false)


      },
    })


  }

  buscarProductosDesactivados(){

  }
}
