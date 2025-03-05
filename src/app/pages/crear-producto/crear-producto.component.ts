import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entites/producto';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../entites/categoria';

@Component({
  selector: 'app-crear-producto',
  standalone: false,
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  errorImagen: boolean = false;
  // imagenSeleccionada?: File;
  producto: Producto = {
    idProducto: 0,
    nombre: '',
    precio: 0,
    stock: 0,
    estado: true,
    imagen: '',
    marca: '',
    modelo: '',
    categoria: null
  };
  categoriaActivas: Categoria[] = [];
  //PRIVATE
  constructor(public productoService: ProductosService, private categoriaService: CategoriasService) { }

  ngOnInit() {
    this.cargarCategorias();

  }
  cargarCategorias() {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categoriaActivas = data.filter((c) => c.estado);
        console.log(this.categoriaActivas)
      },
      error: (error) => {
        console.error("ERRO C." + error);
      }
    })

  }

  crearNuevoProducto() {
    if (this.producto.nombre && this.producto.precio && this.producto.stock) {
      if (!this.producto.categoria || !this.producto.categoria.idCategoria) {
        alert("Debe seleccionar una categoría válida");
        return;
      }

      this.productoService.postProducto(this.producto, this.productoService.imagenSeleccionada) //this.imagenSeleccionada
        .subscribe({
          next: (respuesta) => {
            if (respuesta === 0) {
              alert("Este producto ya exitse")
            }
            console.log("Producto creado:", respuesta);

          },
          error: (error) => {
            console.error("Error al crear producto:", error);
          }
        });
    } else {
      alert("Todos los campos son obligatorios");
    }
  }

}
