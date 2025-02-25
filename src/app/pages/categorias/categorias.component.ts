import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entites/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoria: Categoria[] = [];
  cargando: boolean = false;
  e500: boolean = false
  mensaje: string = "";
  esExito: boolean = false;
  constructor(private categoriaService: CategoriasService, private mensajeService: MensajesService) { }


  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarCategorias()
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

  desactivarCategoria(id: number, nombre:string) {

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
  actualizarCategoria() {

  }

}
