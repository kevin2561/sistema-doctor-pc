import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctorpc-stock';
  constructor(private router: Router) { }


mostrarHeaderYFooter() {
    return this.router.url !== '/login';
  }
}
