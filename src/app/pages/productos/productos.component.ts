import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entites/producto';
import { ProductosService } from '../../services/productos.service';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosActivadosFiltrados: Producto[] = [];
  cargando: boolean = false;
  mensaje: string = "";
  filtro: string = "";
  filtroTemporal: string = "";
  esExito: boolean = false;
  e500: boolean = false
  ceroProductosFiltrados: boolean = false;

  constructor(private productosService: ProductosService, private mensajeSerive: MensajesService) { }


  ngOnInit(): void {
    this.mensajeSerive.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeSerive.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarProductos();
  }

  mostrarProductos(): void {
    this.cargando = true;
    this.e500 = false

    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false
      },
      error: (error) => {
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

}
