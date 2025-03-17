import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entites/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { MensajesService } from '../../services/mensajes.service';
import { error } from 'node:console';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoria: Categoria[] = [];
  categoriaSelect: Categoria = { idCategoria: 0, nombre: "", estado: true }
  cargando: boolean = false;
  e500: boolean = false
  mensaje: string = "";
  esExito: boolean = false;

  filtro: string = "";
  filtroTemporal: string = "";
  categoriasActivadasFiltradas: Categoria[] = [];
  ceroCategoriasFiltrados: boolean = false;

  constructor(private categoriaService: CategoriasService, private mensajeService: MensajesService) { }


  ngOnInit(): void {
    this.mensajeService.mensaje$.subscribe(mensaje => this.mensaje = mensaje);
    this.mensajeService.esExito$.subscribe(esExito => this.esExito = esExito);
    this.mostrarCategorias();
  }
  buscarCategoria(): void {
    this.filtro = this.filtroTemporal.trim();
    this.categoriasActivadasFiltradas = this.categoria?.filter(cat =>
      cat.estado && (
        cat.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      )
    );
    this.ceroCategoriasFiltrados = this.categoriasActivadasFiltradas.length === 0;
    console.log(this.filtro)
    console.log(this.categoriasActivadasFiltradas)
    console.log(this.ceroCategoriasFiltrados)


  }

  mostrarCategorias(): void {
    this.e500 = false;
    this.cargando = true;
    this.categoria = [];

    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.cargando = false;
        this.categoria = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); //Ordenar x nombre
        // console.log(this.categoria)

      },
      error: () => {
        this.e500 = true;
        this.cargando = false;
      }
    })
  }
  get categoriaActivadas(): Categoria[] {
    if (this.filtro.trim() != "") {
      return this.categoriasActivadasFiltradas;

    }
    return this.categoria?.filter(c => c.estado)

  }

  desactivarCategoria(id: number, nombre: string) {

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

  seleccionarCategoria(categoria: Categoria) {
    return this.categoriaSelect = { ...categoria };

  }

  actualizarCategoria() {
    this.categoriaSelect
    this.categoriaService.actualizarC(this.categoriaSelect.idCategoria, this.categoriaSelect).subscribe({
      next: (data) => {
        this.mensajeService.mostrarMensaje(`Categoria ${data.nombre.toUpperCase()} Actualizada`, true)
        this.mostrarCategorias();
      },
      error: (err) => {
        console.log(err)
        this.mensajeService.mostrarMensaje("Error, No se puedo actualizar la categoria", true)

      }
    })

  }
  eliminarCategoria(id: number, nombre: string) {
    if ((window as any).require) {
      // 🔹 Estamos en Electron, usamos dialog.showMessageBox()
      const { dialog } = (window as any).require('electron').remote;
      dialog.showMessageBox({
        type: 'warning',
        title: 'Confirmación',
        message: `¿Estás seguro de que deseas eliminar la categoría ${nombre}?`,
        buttons: ['Cancelar', 'Eliminar'],
        defaultId: 0,
        cancelId: 0
      }).then((result:any) => {
        if (result.response === 1) { // Si el usuario presiona "Eliminar"
          this.procesarEliminacion(id, nombre);
        }
      });
    } else {
      // 🔹 Estamos en el navegador, usamos window.confirm()
      if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría ${nombre}?`)) {
        this.procesarEliminacion(id, nombre);
      }
    }
  }
  
  // ✅ Función para procesar la eliminación (Evita repetir código)
  private procesarEliminacion(id: number, nombre: string) {
    this.categoriaService.eliminarC(id).subscribe({
      next: () => {
        this.mensajeService.mostrarMensaje(
          `Se eliminó la categoría ${nombre.toUpperCase()} correctamente`, true);
        this.mostrarCategorias();
      },
      error: () => {
        this.mensajeService.mostrarMensaje(
          `No puedes eliminar esta categoría ya que está vinculada a un producto.<br>` +
          `Elimina primero el(los) producto(s) vinculados a la categoría <strong>${nombre.toUpperCase()}</strong>`,
          false
        );
      }
    });
  }
  




} //FIN
