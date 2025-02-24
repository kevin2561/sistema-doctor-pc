import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajeSource = new BehaviorSubject<string>('');
  private esExitoSource = new BehaviorSubject<boolean>(true);

  mensaje$ = this.mensajeSource.asObservable();
  esExito$ = this.esExitoSource.asObservable();

  mostrarMensaje(mensaje: string, esExito: boolean) {
    this.mensajeSource.next(mensaje);
    this.esExitoSource.next(esExito);

    setTimeout(() => {
      this.mensajeSource.next('');
    }, 5000);
  }
}
