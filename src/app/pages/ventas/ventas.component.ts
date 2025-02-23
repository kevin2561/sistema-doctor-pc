import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  constructor() {
    this.generarAnios();
  }
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  anios: number[] = [];
  anioMaximo: number = 2050
  anioInicio: number = 2025
  anioActual: number = new Date().getFullYear();
  generarAnios() {
    for (let i = this.anioMaximo; i >= this.anioInicio; i--) {
      this.anios.push(i);
    }
  }
  eliminarVenta() {
    console.log(this.meses)
  }

  // ventas = [
  //   { nombre: "Mark", documento: "Otto", descripcion: "xxx", fecha: "2025-02-21", total: 150 },
  //   { nombre: "John", documento: "Doe", descripcion: "xxx", fecha: "2025-02-21", total: 200 }
  // ];

  // get totalVentas() {
  //   return this.ventas.reduce((total, venta) => total + venta.total, 0);
  // }

}
