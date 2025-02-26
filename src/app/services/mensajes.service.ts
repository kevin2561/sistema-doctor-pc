import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private mensajeSource = new BehaviorSubject<string>('');
  private esExitoSource = new BehaviorSubject<boolean>(true);
  private timeoutId: any; // Variable para guardar el setTimeout

  mensaje$ = this.mensajeSource.asObservable();
  esExito$ = this.esExitoSource.asObservable();

  mostrarMensaje(mensaje: string, esExito: boolean) {
    this.mensajeSource.next(mensaje);
    this.esExitoSource.next(esExito);
    // Si hay un timeout activo, cancelarlo antes de iniciar otro
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => { // 🔹 Aquí sí se guarda el timeout
      this.mensajeSource.next('');
    }, 5000); 
  }
}