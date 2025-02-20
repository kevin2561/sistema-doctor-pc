import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }
  mostrarPassword: boolean = false;
  usuario: string = "kevin";
  password: string = "123456";
  usuarioInput: string = "";
  passwordInput: string = "";
  errorUsuario: boolean = false;
  errorPassword: boolean = false;



  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;

  }
  login() {
    this.errorUsuario = this.usuarioInput !== this.usuario;
    this.errorPassword = this.passwordInput !== this.password;

    if (!this.errorUsuario && !this.errorPassword) {
      console.log("Exitoso")
      this.router.navigate(["/inicio"])

    } else {
      setTimeout(() => {
        this.errorUsuario = false;
        this.errorPassword = false;

      }, 5000);
    }

  }

}
