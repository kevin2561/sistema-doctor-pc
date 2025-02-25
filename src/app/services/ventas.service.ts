import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from '../entites/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url?: string
  // anio = new Date()
  constructor(private http: HttpClient) { }

  mostrarXMesYear(mes: number, anio: number): Observable<Ventas[]> {

    return this.http.post<Ventas[]>(`${this.url}`, {})

  }

  crearV(venta: Ventas): Observable<Ventas> {
    return this.http.post<Ventas>(`${this.url}`, {})
  }

  actualizarV(id: number): Observable<number> {
    return this.http.post<number>(`${this.url}/`, {});

  }

  eliminarV(id: number): Observable<String> {
    return this.http.delete<string>(`${this.url}`, {})

  }
}
