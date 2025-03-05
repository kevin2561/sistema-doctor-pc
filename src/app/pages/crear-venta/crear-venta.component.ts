import { Component } from '@angular/core';
import { Ventas } from '../../entites/ventas';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-crear-venta',
  standalone: false,
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent {

  fecha: Date = new Date();
  fechaFormateada?: string;
  ventas: Ventas = {
    idVenta: 0,
    nombre: "",
    documento: "",
    descripcion: "",
    fecha: "",
    metodoPago: "",
    total: 0
  }
  metodoPagos=["Yape", "Plin", "Tarjeta", "Efectivo"]



  constructor(private ventasService: VentasService) {
    this.fechaFormateada = this.formateoFechPE(this.fecha);
    this.ventas.fecha = this.fechaFormateada;
    console.log("Fecha FORMATEADA:", this.ventas.fecha);


  }





  formateoFechPE(fecha: Date) {
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`
  }




  crearNuevoReporteVentas(ventasx: Ventas) {

  }
}
