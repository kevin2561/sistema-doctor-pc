import { Component } from '@angular/core';
import { Categoria } from '../../entites/categoria';

@Component({
  selector: 'app-crear-categoria',
  standalone: false,
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  categoria: Categoria = {
    idCategoria: 0,
    nombre: "",
    estado: true


  }
  crearNuevaCategoria(){
    console.log("categoria creada")
  }

}
