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
        this.mensajeService.mostrarMensaje(`Categoria ${data.nombre.toUpperCase()} Actualiza`, true)
        this.mostrarCategorias();
      },
      error: (err) => {
        this.mensajeService.mostrarMensaje("Error, No se puedo actualizar la categoria", true)

      }
    })

  }
  eliminarCategoria(id: number, nombre: string) {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría ${nombre}?`)) {
      this.categoriaService.eliminarC(id).subscribe({
        next: (mensaje) => {
          this.mensajeService.mostrarMensaje(`Se Eliminó la categoria ${nombre.toUpperCase()} correctamente`, true);
          this.mostrarCategorias();
        },
        error: (err) => {
          this.mensajeService.mostrarMensaje(
            `No puedes eliminar esta categoría ya que está vinculada a un producto.<br>` +
            `Elimina primero el(los) producto(s) vinculados a la categoría <strong>${nombre.toUpperCase()}</strong>`,
            false
          );
            }
      });
    }
  }
}
