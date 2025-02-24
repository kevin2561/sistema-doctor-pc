import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mesaje-validacion',
  standalone: false,
  templateUrl: './mesaje-validacion.component.html',
  styleUrls: ['./mesaje-validacion.component.css']
})
export class MesajeValidacionComponent {
  @Input() mensaje: string = ""
  @Input() esExito: boolean = true

}
