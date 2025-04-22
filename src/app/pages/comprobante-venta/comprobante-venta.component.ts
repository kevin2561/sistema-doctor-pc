import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ventas } from '../../entites/ventas';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-comprobante-venta',
  standalone: false,
  templateUrl: './comprobante-venta.component.html',
  styleUrl: './comprobante-venta.component.css'
})
export class ComprobanteVentaComponent implements OnInit {
  ventaX?: Ventas;

  ngOnInit(): void {


  }


  constructor(private router: Router) {
    const navigate = this.router.getCurrentNavigation();
    const venta = navigate?.extras.state?.['venta'];
    this.ventaX = venta
    console.log(this.ventaX = venta)
  }
  visualizarPDF(): void {
    const cont = document.getElementById('contenedor-comprobante')!;
    html2canvas(cont, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // Abre en visor PDF del navegador
      window.open(pdf.output('bloburl'), '_blank');
      // o descarga directo:
      // pdf.save('factura.pdf');
    });
  }
}









