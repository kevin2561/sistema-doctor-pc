import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Ventas } from '../../entites/ventas';

@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  constructor(private ventasService: VentasService) {
    this.generarAnios();
  }
  ngOnInit(): void {
    this.generarAnios();
  }
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
    console.log(`mes:${mes} anio: ${anio}`)
    this.ventasService.mostrarXMesYear(mesNum, anioNum).subscribe({
      next: (data) => {
        this.venta = data
        this.calcularVentas();

      }, error: (err) => {
        console.error(err)

      },
    })

  }

  eliminarVenta() {
    console.log("Eliminado")
  }


  actualizarVenta() {
    console.log("UPT")
  }

  calcularVentas() {
    this.totalVentas = this.venta.reduce((sum, v) => sum + v.total, 0)
  }
}
