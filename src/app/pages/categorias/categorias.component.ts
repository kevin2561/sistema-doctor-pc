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
  constructor(private categoriaService: CategoriasService) { }


  ngOnInit(): void {
    this.mostrarCategorias()
    this.desactivarCategoria()
  }

  mostrarCategorias(): void {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categoria = data;
        console.log(this.categoria)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  get categoriaActivadas(): Categoria[] {
    return this.categoria?.filter(c => c.estado)

  }

  desactivarCategoria() {

  }
}
