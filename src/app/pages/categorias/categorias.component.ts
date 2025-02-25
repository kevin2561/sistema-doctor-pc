import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entites/categoria';
import { CategoriasService } from '../../services/categorias.service';

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
  constructor(private categoriaService: CategoriasService) { }


  ngOnInit(): void {
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

  desactivarCategoria() {

  }
  actualizarCategoria() {

  }

}
