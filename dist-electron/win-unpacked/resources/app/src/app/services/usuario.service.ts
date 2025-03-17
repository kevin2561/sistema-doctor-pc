import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entites/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = "https://api-rest-doctor-pc-render-production.up.railway.app/usuario/login"
  // url: string = "http://localhost:9090/usuario/login"
  //   "nombre": "pedroluna123",
  // "password": "pedro123456"

  constructor(private http: HttpClient) { }


  loginUsuario(nombre: string, password: string): Observable<number | string> {
    return this.http.post<number | string>(`${this.url}`, { nombre, password })
  }
}
