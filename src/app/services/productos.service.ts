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
}
