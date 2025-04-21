import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'doctorpc-stock';
  constructor(private router: Router) { }


  ngOnInit() {
    // if (this.router.url === '/') {
    //   this.router.navigate(['/login']); // Redirigir a Login
    // }
  }
mostrarHeaderYFooter() {
    return this.router.url !== '/login';
  }
}
