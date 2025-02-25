import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entites/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = "http://localhost:9090/categoria/"

  constructor(private http: HttpClient) { }


  loginUsuario(nombre: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.url}`, { nombre, password })
  }
}
