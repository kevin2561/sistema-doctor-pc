import { Component } from '@angular/core';
import { Producto } from '../../entites/producto';

@Component({
  selector: 'app-crear-producto',
  standalone: false,
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  errorImagen: boolean = false;
  producto: Producto = {
    idProducto: 0,
    nombre: '',
    precio: 0,
    stock:  0,
    estado: true,
    imagen: '',
    marca: '',
    modelo: '',
    categoria: { idCategoria: 0, nombre: '', estado: true }
  }

  crearNuevoProducto() {
    console.log("creado" + this.producto)
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
