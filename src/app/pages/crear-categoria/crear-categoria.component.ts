import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entites/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { NgForm } from '@angular/forms';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-crear-categoria',
  standalone: false,
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  mensaje: string = "";
  esExito: boolean = true;
  constructor(private categoriaService: CategoriasService, private mensajeService: MensajesService) { }
  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje);
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito);
  }

  categoria: Categoria = {
    idCategoria: 0,
    nombre: "",
    estado: true
  }





  crearNuevaCategoria(formularioCategoriaNuevo: NgForm) {
    if (!this.categoria.nombre.trim()) {
      this.mensajeService.mostrarMensaje("El campo esta Vacio", false);
      return;
    }

    const nuevaCategoria = {
      nombre: this.categoria.nombre,
      estado: this.categoria.estado
    }
    this.categoriaService.postCategoria(nuevaCategoria).subscribe({
      next: (data) => {
        console.log(`Cageoria "${data.nombre}" creado exitosamente`);
        this.mensajeService.mostrarMensaje(`Categoría "${data.nombre}" creada exitosamente.`, true);
        formularioCategoriaNuevo.resetForm();

      },
      error: (error) => {
        if (!error || !error.status) {
          // Error inesperado (por ejemplo, la API no responde)
          this.mensajeService.mostrarMensaje(`Error de conexión. Inténtalo más tarde.`, false);
          formularioCategoriaNuevo.resetForm();

        } else {
          // Otros errores (500, 403, etc.)
          this.mensajeService.mostrarMensaje(`Esta categoría ya existe.`, false);
          formularioCategoriaNuevo.resetForm();

        }
      }
    });


  }
  // mostrarMensaje(mensaje: string, esExito: boolean) {
  //   this.mensaje = mensaje;
  //   this.esExito = esExito;

  //   setTimeout(() => {
  //     this.mensaje = "";
  //   }, 5000);

  // }
}
