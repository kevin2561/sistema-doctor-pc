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
  imagenSeleccionada: File | null = null;
  producto: Producto = {
    idProducto: 0,
    nombre: '',
    precio: 0,
    stock: 0,
    estado: true,
    imagen: '',
    marca: '',
    modelo: '',
    categoria: { idCategoria: 0, nombre: '', estado: true }
  };
  categoria: Categoria[] = [];

  constructor(private productoService: ProductosService, private categoriaService: CategoriasService) { }
  ngOnInit() {
    this.cargarCategorias();

  }
  cargarCategorias() {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categoria = data;
        console.log(this.producto.categoria)
      },
      error: (error) => {
        console.error(error);
      }
    })

  }



  crearNuevoProducto() {
    if (this.producto.nombre && this.producto.precio && this.producto.stock) {
      this.productoService.postProducto(this.producto, this.imagenSeleccionada || undefined)
        .subscribe(
          (respuesta) => {
            console.log("Producto creado:", respuesta);
          },
          (error) => {
            console.error("Error al crear producto:", error);
          }
        );
    } else {
      alert("Todos los campos son obligatorios");
    }
  }



  validarSizeImagen(event: any) {
    const maxSize = 10 * 1024 * 1024; // 10MB en bytes
    const file = event.target.files[0];

    if (file) {
      // Obtener la extensión del archivo
      const extensionesPermitidas = ["jpg", "jpeg", "png"];
      const extension = file.name.split('.').pop().toLowerCase();

      if (!extensionesPermitidas.includes(extension)) {
        alert("Solo se permiten imágenes JPG, JPEG y PNG.");
        event.target.value = ""; // Limpia el input
        return;
      }

      // Verificar el tamaño
      if (file.size > maxSize) {
        alert("El archivo debe ser menor a 10MB.");
        event.target.value = ""; // Limpia el input
        return;
      }

      // Si el archivo es válido, puedes hacer algo con él aquí
      console.log("Archivo válido:", file);
    }
  }
}
