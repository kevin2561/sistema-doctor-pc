import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ventas } from '../../entites/ventas';


@Component({
  selector: 'app-comprobante-venta',
  standalone: false,
  templateUrl: './comprobante-venta.component.html',
  styleUrl: './comprobante-venta.component.css'
})
export class ComprobanteVentaComponent {
  ventaX?: Ventas;


  constructor(private router: Router) {
    const navigate = this.router.getCurrentNavigation();
    const venta = navigate?.extras.state?.['venta'];

    console.log(this.ventaX = venta
    )
  }

}
