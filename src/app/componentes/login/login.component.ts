import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private usuarioService: UsuarioService) { }
  mostrarPassword: boolean = false;
  usuarioInput: string = "";
  passwordInput: string = "";
  errorUsuario: boolean = false;
  errorPassword: boolean = false;



  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;

  }
  login() {
    this.errorUsuario = false;
    this.errorPassword = false;
    console.log("Usuario:", this.usuarioInput);
    console.log("Contraseña:", this.passwordInput);

    this.usuarioService.loginUsuario(this.usuarioInput, this.passwordInput).subscribe({
      next: (data: any) => {
        console.log("Respuesta del servidor:", data);
        if (data.message === "2") {
          this.router.navigate(["/inicio"]);
        }
      },
      error: (err: HttpErrorResponse) => {
        // console.log("Error en la petición:", err);
        if (err.status === 401) {
          // Captura la respuesta del servidor
          const errorResponse = err.error;
          if (errorResponse.message === "0") {
            this.errorUsuario = true;
            console.log("Usuario incorrecto");
          } else if (errorResponse.message === "1") {
            this.errorPassword = true;
            console.log("Contraseña incorrecta");
          }
        }
      }
    });
  }


}
