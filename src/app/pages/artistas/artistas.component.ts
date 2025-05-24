import { Component, OnInit } from '@angular/core';
import { ArtitasService } from '../../services/artitas.service';
import { Artista } from '../../entites/artitas';
import { parse } from 'node:path';

@Component({
  selector: 'app-artistas',
  standalone: false,
  templateUrl: './artistas.component.html',
  styleUrl: './artistas.component.css'
})
export class ArtistasComponent implements OnInit {

  constructor(private artistaService: ArtitasService) { }
  ngOnInit(): void {
    this.leerServicio()
  }
  arrayArtistas: Artista[] = [];
  totalPgainas: number = 0
  paginaActual: number = 0
  cantidadDatos: number = 10;



  leerServicio() {
    this.artistaService.leerArtistas(this.paginaActual, this.cantidadDatos).subscribe({
      next: (data: any) => {
        this.arrayArtistas = data.content;
        this.totalPgainas = data.totalPages
        console.log(data)
      },
      error: (error) => {
        console.log(error)


      }
    })

  }

  getPaginas(): number[] {
    return Array(this.totalPgainas).fill(0).map((_, i) => i);

  }
  irPagina(pagina: number) {
    this.paginaActual = pagina;
    this.leerServicio();



  }
  atras() {
    if (this.paginaActual > 0) {
      // console.log(this.paginaActual--)
      // this.paginaActual-- // forma 1
      // this.leerServicio() //forma 1
      this.irPagina(this.paginaActual - 1); //forma 2

    }

  }
  siguiente() {
    console.log("siguiente")
    //5
    if (this.paginaActual < this.totalPgainas - 1) {
      // console.log(this.paginaActual++)
      // this.paginaActual++ // forma 1
      // this.leerServicio() //forma 1
      this.irPagina(this.paginaActual + 1); //forma 2

    }

  }

  mostrarCantidadDatos(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.cantidadDatos = parseInt(select.value);
    this.paginaActual = 0
    this.leerServicio();

  }
}
