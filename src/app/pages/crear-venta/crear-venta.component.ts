import { Component, OnInit } from '@angular/core';
import { Ventas } from '../../entites/ventas';
import { VentasService } from '../../services/ventas.service';
import { MensajesService } from '../../services/mensajes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-venta',
  standalone: false,
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {
  mensaje: string = "";
  esExito: boolean = true;
  fecha: Date = new Date();
  fechaFormateada?: string;
  ventas: Ventas = {
    idVenta: 0,
    nombre: "",
    documento: "",
    descripcion: "",
    fecha: "",
    metodoPago: "",
    total: null
  } as Ventas
  metodoPagos = ["Efectivo", "Plin", "Tarjeta", "Yape"]

  constructor(private ventasService: VentasService, private mensajeService: MensajesService) {
    this.fechaFormateada = this.ventasService.formateoFechPE(this.fecha)
    this.ventas.fecha = this.fechaFormateada;

    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje);
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito);
  }
  ngOnInit(): void {
    // this.ventas.fecha =this.ventasService.formateoFechPE(new Date());
    this.ventas.metodoPago = "";
    console.log('Valor inicial de metodoPago:', this.ventas.metodoPago);
  }


  crearNuevoReporteVentas(ventax: Ventas, formularioNuevaVenta: NgForm) {

    // Formatea la fecha en el formato yyyy-MM-dd
    const fecha = new Date(ventax.fecha);
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    ventax.fecha = `${año}-${mes}-${dia}`;

    // Asegúrate de que total sea un número decimal
    // No es necesario usar parseFloat porque ventax.total ya es un number
    if (typeof ventax.total === 'string') {
      ventax.total = parseFloat(ventax.total); // Solo si total es un string
    }

    // console.log("Datos a enviar:", JSON.stringify(ventax, null, 2));

    this.ventasService.crearV(ventax).subscribe({
      next: (data) => {
        this.mensajeService.mostrarMensaje(`Venta creada: Código N° ${data.idVenta}`, true);
        formularioNuevaVenta.reset()
        const fechaActual = this.ventasService.formateoFechPE(new Date())
        this.ventas.fecha = fechaActual;
        this.ventas.metodoPago = "";
        console.log("Venta creada:", data);
      },
      error: (err) => {
        console.error("Error:", err);
        console.error("Detalle del error:", JSON.stringify(err, null, 2));
        this.mensajeService.mostrarMensaje("Error, intentelo más tarde", false)

      },
    });
  }
}
