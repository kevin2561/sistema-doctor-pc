import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../entites/categoria';
import { text } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {

  }
  url: string = "http://localhost:9090/categoria/"



  //BUSCAR
  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}` + "get")
  }
  //CREAR
  postCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.url}post`, categoria)
  }
  //ACTIVAR
  activarC(id: number): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.url}activar/${id}`, {});
  }

  //DESACTIVAR
  desactivarC(id: number): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.url}desactivar/${id}`, {});
  }

  //UPDATE
  actualizarC(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.url}put/${id}`, categoria);
  }

  //DELETE
  eliminarC(id: number): Observable<any> {
   return this.http.delete(`${this.url}delete/${id}`, { responseType: 'text' });
  }

}
