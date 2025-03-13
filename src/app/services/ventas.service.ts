import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from '../entites/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  // url: string = "https://api-rest-docot-pc-railway-subido.onrender.com/ventas"
  // anio = new Date()
  private url: string = "http://localhost:9090/ventas";
  constructor(private http: HttpClient) { }

  mostrarXMesYear(mes: number, anio: number): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(`${this.url}/filtrar`, {
      params: { mes: mes.toString(), anio: anio.toString() },
      responseType: 'json' // Asegura que se interprete como JSON
    });

  }

  crearV(venta: Ventas): Observable<Ventas> {
    return this.http.post<Ventas>(`${this.url}/post`, venta);
  }

  actualizarV(id: number, venta: Ventas): Observable<Ventas> {
    return this.http.put<Ventas>(`${this.url}/put/${id}`, venta);

  }

  eliminarV(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' })

  }

  formateoFechPE(fecha: Date) {
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`
  }
}
