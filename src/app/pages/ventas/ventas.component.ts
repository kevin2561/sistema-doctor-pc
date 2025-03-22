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
  constructor(private ventasService: VentasService, private mensajeService: MensajesService) { }

  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje);
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito);
    this.generarAnios();
  }
  ceroVentasFiltrados: boolean = false;
  indiceSeleccionado?: number;

  filtroTemporal: string = "";
  filtro: string = "";
  ceroVentasEncontrados: boolean = false;
  ventasFiltradas: Ventas[] = [];


  divMensajeVentas: boolean = false;
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
  mesSeleccionado: string | null | number = null
  anioSeleccionado: string | null | number = null
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
    this.anios.sort((a, b) => a - b)
  }

  filtrarVentas(mes: string, anio: string) {
    const mesNum = parseInt(mes, 10)
    const anioNum = parseInt(anio, 10)
    if (!mesNum && !anioNum) {
      return;
    }

    this.e500 = false
    this.cargando = true;

    this.mesSeleccionado = mesNum
    this.anioSeleccionado = anioNum
    this.divMensajeVentas = false;
    this.ceroVentasEncontrados = false;


    this.ventasService.mostrarXMesYear(mesNum, anioNum).subscribe({
      next: (data) => {
        this.cargando = false;

        if (data.length === 0) {
          // this.mensajeService.mostrarMensaje(`No hay ventas registradas para el mes ${this.meses[mesNum - 1][0]} del  ${anio}`, false);
          this.venta = [];
          this.totalVentas = 0;
          this.ceroVentasFiltrados = true
          this.divMensajeVentas= false;
          this.ventasFiltradas=[]
          return;
        }
        this.venta = data.sort((a, b) => b.idVenta - a.idVenta)
        this.ventasFiltradas = this.venta
        this.calcularVentas();
        this.divMensajeVentas = true;
        this.ceroVentasFiltrados = false

        // console.log(this.venta)
        data.length === 1
          ? this.mensajeService.mostrarMensaje(
            `Se encontraro ${data.length} registro de venta de ${this.meses[mesNum - 1][0]} del ${anio}`,
            true
          )
          : this.mensajeService.mostrarMensaje(
            `Se encontraron ${data.length} registros de ventas de ${this.meses[mesNum - 1][0]} del ${anio}`,
            true
          )
      }, error: (err) => {
        this.cargando = false;
        this.e500 = true

      },
    })
  }

  buscarVenta() {
    this.filtro = this.filtroTemporal.trim();
    if (this.filtro === "") {
      this.ventasFiltradas = this.venta
    }
    else {
      this.ventasFiltradas = this.venta.filter(v =>
        v.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        v.documento.toLowerCase().includes(this.filtro.toLowerCase()) ||
        v.fecha.toLowerCase().includes(this.filtro.toLowerCase()) ||
        v.metodoPago.toLowerCase().includes(this.filtro.toLowerCase())
      )
    }
    this.ceroVentasEncontrados = this.ventasFiltradas.length === 0;
    this.ceroVentasFiltrados= false;

  }

  seleccionarVenta(venta: Ventas, i?: number) {
    this.ventaSeleccionada = { ...venta }
    this.ventaSeleccionada.total = parseFloat(venta.total.toFixed(2));
    console.log(this.ventaSeleccionada.total);
    if (i !== undefined) {
      this.indiceSeleccionado = i;
    }

  }
  eliminarVenta() {
    const id = this.ventaSeleccionada.idVenta;
    this.ventasService.eliminarV(id).subscribe({
      next: () => {
        this.ventasFiltradas.splice(this.indiceSeleccionado!, 1);

        this.mensajeService.mostrarMensaje(`Se elimino la Venta ${id}`, true)
        this.calcularVentas();
      },
      error: () => {
        this.mensajeService.mostrarMensaje(`Error, inténtelo más tarde`, false)

      }
    })

  }



  actualizarVenta() {
    const id = this.ventaSeleccionada.idVenta
    if (isNaN(this.ventaSeleccionada.total)) {
      this.mensajeService.mostrarMensaje(`La venta ${id} el total debe ser un número válido.`, false);
      return;

    }
    this.ventasService.actualizarV(id, this.ventaSeleccionada).subscribe({
      next: (data) => {
        const index = this.ventasFiltradas.findIndex(v => v.idVenta === this.ventaSeleccionada.idVenta);
        if (index !== -1) {
          this.ventasFiltradas[index] = { ...this.ventaSeleccionada }; // Actualiza el objeto en el array
        }


        this.mensajeService.mostrarMensaje(`Venta ${id} actualizada correctamente.`, true)
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
