import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../entites/producto';
declare var bootstrap: any;


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: String = "https://api-rest-doctor-pc-render-production.up.railway.app/producto"
  // private url: String = "http://localhost:9090/producto"
  imagenGrande: string = '';
  imagenSeleccionada?: File;
  constructor(private http: HttpClient) { }

  //MOSTRAR
  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/get`);
  }
  //CREAR
  postProducto(producto: Producto, imagen?: File): Observable<Producto | number> {
    const formdata = this.crearFormData(producto, imagen)
    return this.http.post<Producto | number>(`${this.url}/post`, formdata)
  }
  //ACTUALIZAR
  actualizarP(id: number, producto: Producto, imagen?: File): Observable<Producto | number> {
    const formdata = this.crearFormData(producto, imagen)
    return this.http.put<Producto | number>(`${this.url}/put/${id}`, formdata)

  }

  //ACTIVAR
  activarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/activar/${id}`, {});
  }
  //DESACTIVAR
  desactivarP(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/desactivar/${id}`, {});
  }


  //ELIMINAR
  eliminarP(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' })
  }
  //STOCK0
  stockCero(id: number): Observable<number> {
    return this.http.patch<number>(`${this.url}/stock/${id}`, {})
  }

  verImagenGrande(imagen: string | null | undefined) {
    this.imagenGrande = imagen ?? 'assets/no-imagen.jpg';

    const modalElement = document.getElementById('imagePreviewModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  private crearFormData(producto: Producto, imagen?: File): FormData {

    const formData = new FormData()

    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio ? producto.precio.toString() : "0");
    formData.append("stock", producto.stock ? producto.stock.toString() : "0");
    formData.append("estado", producto.estado?.toString());
    formData.append("marca", producto.marca);
    formData.append("modelo", producto.modelo);
    formData.append("condicion", producto.condicion);
    if (producto.categoria?.idCategoria) {
      formData.append("idCategoria", producto.categoria.idCategoria.toString());

    }

    if (imagen) {
      formData.append("imagen", imagen);
    }
    return formData

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
        setTimeout(() => event.target.focus(), 0); // Restaura el foco

        return;
      }

      // Verificar el tamaño
      if (file.size > maxSize) {
        alert("El archivo debe ser menor a 10MB.");
        setTimeout(() => event.target.focus(), 0); // Restaura el foco

        event.target.value = ""; // Limpia el input
        return;
      }

      // Si el archivo es válido, puedes hacer algo con él aquí
      this.imagenSeleccionada = file;
      console.log("Archivo válido:", file);
    }
  }

}
