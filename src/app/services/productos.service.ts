import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../entites/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: String = "http://localhost:9090/producto/get"
  constructor(private http: HttpClient) { }


  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}`);
  }
  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}`, {})

  }
  activarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/activar/${id}`, {});
  }
  desactivarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/desactivar/${id}`, {});
  }
  actualizarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/put/${id}`, {});
  }
}
