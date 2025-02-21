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
  constructor(private productosService: ProductosService) { }

  
  ngOnInit(): void {
    this.mostrarProductos();
    this.desactivarProducto()
  }

  mostrarProductos(): void {
    this.productosService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log(this.productos)
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  get productosActivados():Producto[]{
    return this.productos?.filter(p=> p.estado)
  }

  desactivarProducto():void {
    console.log("Desactivar")
  }

}
