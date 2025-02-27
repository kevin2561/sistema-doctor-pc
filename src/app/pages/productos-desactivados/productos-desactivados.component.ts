import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../entites/producto';
import { MensajesService } from '../../services/mensajes.service';

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

  constructor(private productoService: ProductosService, private mensajeService: MensajesService) {

  }
  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarProductos();
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

  mostrarProductos() {
    this.cargando = true

    this.e500 = false;
    this.productoService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data
        this.cargando = false


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


}
