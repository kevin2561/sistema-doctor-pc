import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtitasService {


  constructor(private hhtp: HttpClient) { }

  url: string = "http://localhost:8080/cantantes/get-pagination";
  leerArtistas(page: number, size: number) {
    return this.hhtp.get(this.url + `?page=${page}&size=${size}`);
  }
}
