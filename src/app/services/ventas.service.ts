import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from '../entites/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url: string = "http://localhost:9090/ventas"
  // anio = new Date()
  constructor(private http: HttpClient) { }

  mostrarXMesYear(mes: number, anio: number): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(`${this.url}/filtrar`, {
      params: { mes: mes.toString(), anio: anio.toString() },
      responseType: 'json' // Asegura que se interprete como JSON
    });

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
