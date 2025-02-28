import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entites/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { MensajesService } from '../../services/mensajes.service';
import { error } from 'node:console';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoria: Categoria[] = [];
  categoriaSelect: Categoria = { idCategoria: 0, nombre: "", estado: true }
  cargando: boolean = false;
  e500: boolean = false
  mensaje: string = "";
  esExito: boolean = false;
  constructor(private categoriaService: CategoriasService, private mensajeService: MensajesService) { }


  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje);
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito);
    this.mostrarCategorias();
  }

  mostrarCategorias(): void {
    this.e500 = false;
    this.cargando = true;
    this.categoria = [];

    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.cargando = false;
        this.categoria = data;
        // console.log(this.categoria)

      },
      error: () => {
        this.e500 = true;
        this.cargando = false;

      }
    })
  }
  get categoriaActivadas(): Categoria[] {
    return this.categoria?.filter(c => c.estado)

  }

  desactivarCategoria(id: number, nombre: string) {

    this.categoriaService.desactivarC(id).subscribe({
      next: () => {
        this.mostrarCategorias();
        this.mensajeService.mostrarMensaje(`Se Desactivada la categoria ${nombre.toUpperCase()} correctamente`, true);

      },
      error: (err) => {
        this.mensajeService.mostrarMensaje(`Error, al  Desactivada la categoria ${nombre.toUpperCase()} `, true);
        console.error(err);



      },
    })
  }

  seleccionarCategoria(categoria: Categoria) {
    return this.categoriaSelect = { ...categoria };

  }

  actualizarCategoria() {
    this.categoriaSelect
    this.categoriaService.actualizarC(this.categoriaSelect.idCategoria, this.categoriaSelect).subscribe({
      next: (data) => {
        console.log("Categoría actualizada con éxito:", data);
        alert("Categoría actualizada correctamente");
        this.mostrarCategorias();
      },
      error: (err) => {
        console.error("Error al actualizar la categoría", err);
        alert("Error al actualizar la categoría");
      }
    })

  }
  eliminarCategoria(id: number) {
    this.categoriaService.eliminarC(id).subscribe({
      next: (mensaje) => {
        console.log("Categoría eliminada:", mensaje);
        alert(mensaje); // Muestra el mensaje del backend
        this.mostrarCategorias(); // Actualiza la lista
      },
      error: (err) => {
        console.error("Error al eliminar la categoría", err);
        alert("Error al eliminar la categoría");
      }
    });
  }
}
