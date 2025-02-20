import { Component } from '@angular/core';

@Component({
  selector: 'app-productos-desactivados',
  standalone: false,
  templateUrl: './productos-desactivados.component.html',
  styleUrls: ['./productos-desactivados.component.css']
})
export class ProductosDesactivadosComponent {
  activarProducto() {
    console.log("acivado")
  }

}
