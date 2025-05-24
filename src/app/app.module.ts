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
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductosService } from './services/productos.service';
import { MesajeValidacionComponent } from './mensaje/mesaje-validacion/mesaje-validacion.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { ErrorServidorComponent } from './mensaje/error-servidor/error-servidor.component';
import { Page404Component } from './estados/page-404/page-404.component';
import { ComprobanteVentaComponent } from './pages/comprobante-venta/comprobante-venta.component';
import { ArtistasComponent } from './pages/artistas/artistas.component';
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
    VentasComponent,
    MesajeValidacionComponent,
    LoadingComponent,
    ErrorServidorComponent,
    Page404Component,
    ComprobanteVentaComponent,
    ArtistasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    
  



  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
