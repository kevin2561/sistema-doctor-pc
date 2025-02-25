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
  meses: [string, number][] = [
    ['Enero', 0], ['Febrero', 1], ['Marzo', 2], ['Abril', 3],
    ['Mayo', 4], ['Junio', 5], ['Julio', 6], ['Agosto', 7],
    ['Septiembre', 8], ['Octubre', 9], ['Noviembre', 10], ['Diciembre', 11]
  ];
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
    console.log("Eliminado")
  }

  // ventas = [
  //   { nombre: "Mark", documento: "Otto", descripcion: "xxx", fecha: "2025-02-21", total: 150 },
  //   { nombre: "John", documento: "Doe", descripcion: "xxx", fecha: "2025-02-21", total: 200 }
  // ];

  // get totalVentas() {
  //   return this.ventas.reduce((total, venta) => total + venta.total, 0);
  // }

  actualizarVenta() {
    console.log("UPT")
  }
  filtrarVentas() {
    console.log("filtrado")

  }

}
