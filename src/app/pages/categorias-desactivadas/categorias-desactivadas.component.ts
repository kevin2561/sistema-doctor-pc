import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../entites/categoria';
import { MensajesService } from '../../services/mensajes.service';

@Component({
  selector: 'app-categorias-desactivadas',
  standalone: false,
  templateUrl: './categorias-desactivadas.component.html',
  styleUrls: ['./categorias-desactivadas.component.css']
})
export class CategoriasDesactivadasComponent implements OnInit {
  categorias: Categoria[] = []
  mensaje: string = ""
  esExito: boolean = false
  cargando: boolean = false
  e500: boolean = false


  constructor(private categoriaService: CategoriasService, private mensajeService: MensajesService) { }
  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito)
    this.mostrarCategorias()

  }

  mostrarCategorias() {
    this.cargando = true
    this.e500 = false
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categorias = data;
        // console.log(data)
        setTimeout(() => {
          this.cargando = false
        }, 100)
      },
      error: (err) => {
        console.log(err)
        this.e500 = true
        this.cargando = false

      },
    })

  }

  get cDesactivadas(): Categoria[] {
    return this.categorias?.filter(c => !c.estado)
  }

  activarCategoria(id: number, nombre: string) {
    this.categoriaService.activarC(id).subscribe({
      next: () => {
        this.mostrarCategorias()
        this.mensajeService.mostrarMensaje(`Categoría ${nombre.toUpperCase()} Activada correctamente`, true);
      },

      error: (err) => {
        this.mensajeService.mostrarMensaje(`Error, No se puedo Activar ${nombre.toUpperCase()} `, false);
        console.error(err)

      },
    });

  }

}
