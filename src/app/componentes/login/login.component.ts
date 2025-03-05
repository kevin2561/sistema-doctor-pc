import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private usuarioService: UsuarioService) { }
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
    // this.usuarioService.loginUsuario(this.usuario, this.password).subscribe({
    //   next: (data) => {
    //     switch (data) {
    //       case 1:
    //         this.errorUsuario = this.usuarioInput !== this.usuario;
    //         break;
    //       case 2:
    //         this.errorPassword = this.passwordInput !== this.password;
    //         break;
    //       default:
    //         alert("Exito")
    //         this.router.navigate(["/inicio"])
    //     }

    //   },
    //   error: (err) => {
    //     console.log(err)

    //   }
    // })

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
