import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../entites/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: String = "http://localhost:9090/producto"
  constructor(private http: HttpClient) { }


  //MOSTRAR
  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/get`);
  }
  //CREAR
  postProducto(producto: Producto, imagen?: File): Observable<Producto> {
    const formData = new FormData();

    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio.toString());
    formData.append("stock", producto.stock.toString());
    formData.append("estado", producto.estado.toString());
    formData.append("marca", producto.marca);
    formData.append("modelo", producto.modelo);
    formData.append("idCategoria", producto.categoria.idCategoria.toString());

    if (imagen) {
      formData.append("imagen", imagen);
    }

    return this.http.post<Producto>(`${this.url}/post`, formData);
  }
  //ACTIVAR
  activarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/activar/${id}`, {});
  }
  //DESACTIVAR
  desactivarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/desactivar/${id}`, {});
  }

  //ACTUALIZAR
  actualizarP(id: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/put/${id}`, {});
  }

  //ELIMINAR
  eliminarP(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' })

  }
}
