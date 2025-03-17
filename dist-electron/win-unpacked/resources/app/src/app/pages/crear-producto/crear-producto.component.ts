import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entites/producto';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../entites/categoria';
import { MensajesService } from '../../services/mensajes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  standalone: false,
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  errorImagen: boolean = false;
  // imagenSeleccionada?: File;
  mensaje: string = ""
  esExito: boolean = false
  producto: Producto = {
    idProducto: 0,
    nombre: '',
    precio: 0,
    stock: 0,
    estado: true,
    imagen: '',
    marca: '',
    modelo: '',
    categoria: null,
    condicion: ""
  };
  categoriaActivas: Categoria[] = [];
  condicionSelect: string[] = ["Alternativo", "Nuevo", "Usado"];
  //PRIVATE
  constructor(public productoService: ProductosService, private categoriaService: CategoriasService, private mensajeService: MensajesService) { }

  ngOnInit() {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje)
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito)
    this.cargarCategorias();

  }
  cargarCategorias() {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categoriaActivas = data.filter((c) => c.estado).sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log(this.categoriaActivas)
      },
      error: (error) => {
        console.error("ERRO C." + error);
      }
    })

  }

  crearNuevoProducto(formularioProductoNuevo :NgForm) {
    if (this.producto.nombre && this.producto.precio && this.producto.stock) {
      if (!this.producto.categoria || !this.producto.categoria.idCategoria) {
        alert("Debe seleccionar una categoría válida");
        return;
      }

      this.productoService.postProducto(this.producto, this.productoService.imagenSeleccionada) //this.imagenSeleccionada
        .subscribe({
          next: (respuesta) => {
            if (respuesta === 0) {
              // alert("Este producto ya exitse")
              this.mensajeService.mostrarMensaje(`Este Producto ya existe ${this.producto.nombre}`, false)
              console.log(respuesta)
              return;
            }
            this.mensajeService.mostrarMensaje(`Producto ${this.producto.nombre} creado exitosamente`, true)
            console.log(respuesta)
            formularioProductoNuevo.resetForm();

          },
          error: (error) => {
            console.log(error)
            this.mensajeService.mostrarMensaje(`Error, intento más tarde`, false)
          }
        });
    } else {
      alert("Todos los campos son obligatorios");
    }
  }

}
