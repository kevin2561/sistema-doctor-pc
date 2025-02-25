import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entites/producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  cargando: boolean = false;
  constructor(private productosService: ProductosService) { }


  ngOnInit(): void {
    this.mostrarProductos();
    this.desactivarProducto()
  }

  mostrarProductos(): void {
    this.cargando = true;
    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
        // console.log(this.productos)
        this.cargando = false
      },
      error: (error) => {
        this.cargando = false

        // if (!error || !error.status) {
        //   console.log("Error de Servidor Producto")
        // } else if (error.status === 500) {
        //   console.error(error);

        // }
        // console.error(error);

      }
    });

  }

  get productosActivados(): Producto[] {
    return this.productos?.filter(p => p.estado)
  }

  desactivarProducto(): void {
    console.log("Desactivar")
  }

}
