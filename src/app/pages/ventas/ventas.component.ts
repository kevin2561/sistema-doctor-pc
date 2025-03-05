import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Ventas } from '../../entites/ventas';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  constructor(private ventasService: VentasService, private mensajeService: MensajesService) {
    this.generarAnios();
  }
  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje);
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito);
    this.generarAnios();

  }
  mensaje: string = "";
  esExito: boolean = false;
  meses: [string, number][] = [
    ['Enero', 1], ['Febrero', 2], ['Marzo', 3], ['Abril', 4],
    ['Mayo', 5], ['Junio', 6], ['Julio', 7], ['Agosto', 8],
    ['Septiembre', 9], ['Octubre', 10], ['Noviembre', 11], ['Diciembre', 12]
  ];
  anios: number[] = [];
  venta: Ventas[] = [];
  anioMaximo: number = 2050
  anioInicio: number = 2025
  anioActual: number = new Date().getFullYear();
  totalVentas: number = 0
  mesSeleccionado: string = ""
  anioSeleccionado: string = ""
  e500: boolean = false;
  cargando: boolean = false;
  ventaSeleccionada: Ventas = {
    idVenta: 0,
    nombre: "",
    documento: "",
    descripcion: "",
    fecha: "",
    metodoPago: "",
    total: 0

  }
  metodoPagos = ["Yape", "Plin", "Tarjeta", "Efectivo"]

  generarAnios() {
    for (let i = this.anioMaximo; i >= this.anioInicio; i--) {
      this.anios.push(i);
    }
  }

  filtrarVentas(mes: string, anio: string) {

    const mesNum = parseInt(mes, 10)
    const anioNum = parseInt(anio, 10)
    if (!mesNum) {
      alert("Seleccione un Mes")
      return
    } else if (!anioNum) {
      alert("Seleccione un Año")
      return
    }
    this.e500 = false
    this.cargando = true;


    this.mesSeleccionado = this.meses[mesNum - 1][0]
    this.anioSeleccionado = anio

    this.ventasService.mostrarXMesYear(mesNum, anioNum).subscribe({
      next: (data) => {
        this.cargando = false;

        if (data.length === 0) {
          this.mensajeService.mostrarMensaje(`No hay ventas registradas para el mes ${this.meses[mesNum - 1][0]} del  ${anio}`, false);
          this.venta = [];
          this.totalVentas = 0;

          return;

        }
        this.venta = data
        this.calcularVentas();
        data.length === 1
          ? this.mensajeService.mostrarMensaje(
            `Se encontraro ${data.length} registro de ventas de ${this.meses[mesNum - 1][0]} del ${anio}`,
            true
          )
          : this.mensajeService.mostrarMensaje(
            `Se encontraron ${data.length} registros  de ventas de ${this.meses[mesNum - 1][0]} del ${anio}`,
            true
          )


      }, error: (err) => {
        this.cargando = false;
        this.e500 = true

      },
    })

  }

  eliminarVenta(id: number, indice: number) {
    if (window.confirm(`¿Está seguro de que desea eliminar la Venta ${indice + 1} ?`)) {
      this.ventasService.eliminarV(id).subscribe({
        next: () => {
          this.venta.splice(indice, 1);
          this.mensajeService.mostrarMensaje(`Se elimino la Venta ${indice + 1}`, true)
          // this.generarAnios();
          this.calcularVentas();
        },
        error: () => {
          this.mensajeService.mostrarMensaje(`Error al eliminar, inténtelo más tarde`, false)

        }
      })
    }
  }
  seleccionarVenta(venta: Ventas) {
    return this.ventaSeleccionada = { ...venta }

  }

  actualizarVenta() {
    const id = this.ventaSeleccionada.idVenta
    this.ventasService.actualizarV(id, this.ventaSeleccionada).subscribe({
      next: (data) => {
        this.mensajeService.mostrarMensaje(`Venta ${id} actualizado correctamente.`,true)
        console.log(data);
        this.calcularVentas();

      },
      error: (err) => {
        this.mensajeService.mostrarMensaje("Ocurrio un error, intenlo más tarde.", false)

      },
    })
  }

  calcularVentas() {
    this.totalVentas = this.venta.reduce((sum, v) => sum + v.total, 0)
  }
}
