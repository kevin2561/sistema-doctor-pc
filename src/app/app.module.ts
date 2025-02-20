import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosDesactivadosComponent } from './pages/productos-desactivados/productos-desactivados.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { CategoriasDesactivadasComponent } from './pages/categorias-desactivadas/categorias-desactivadas.component';
import { CrearVentaComponent } from './pages/crear-venta/crear-venta.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { HttpClientModule  } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    CategoriasComponent,
    ProductosDesactivadosComponent,
    CrearProductoComponent,
    CrearCategoriaComponent,
    CategoriasDesactivadasComponent,
    CrearVentaComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
    
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
