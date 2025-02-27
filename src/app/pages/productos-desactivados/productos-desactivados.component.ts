import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../entites/producto';

@Component({
  selector: 'app-productos-desactivados',
  standalone: false,
  templateUrl: './productos-desactivados.component.html',
  styleUrls: ['./productos-desactivados.component.css']
})
export class ProductosDesactivadosComponent implements OnInit {
  productos: Producto[] = []

  constructor(private productoService: ProductosService) {

  }
  ngOnInit(): void {
this.mostrarProductos();
  }
  activarProducto() {
    console.log("acivado")
  }

  mostrarProductos() {
    this.productoService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data
      },
      error: (e) => {
        console.error(e)

      }
    })
  }

  get pDesactivados(): Producto[] {
    return this.productos?.filter((p) => !p.estado)
  }


}
