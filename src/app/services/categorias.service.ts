import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../entites/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {

  }
  url: string = "http://localhost:9090/categoria/"



  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}` + "get")
  }
  postCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.url}post`, categoria)
  }
  activarC(id: number): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.url}activar/${id}`, {});
  }

}
