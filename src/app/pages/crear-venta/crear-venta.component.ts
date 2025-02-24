import { Component } from '@angular/core';
import { Ventas } from '../../entites/ventas';

@Component({
  selector: 'app-crear-venta',
  standalone: false,
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent {
  ventas: Ventas = {
    idVenta: 0,
    nombre: "",
    documento: "",
    descripcion: "",
    fecha: "",
    metodoPago: "",
    total: 0




  }

  crearNuevoReporteVentas() {
    console.log("");
  }


}
