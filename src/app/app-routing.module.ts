import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosDesactivadosComponent } from './pages/productos-desactivados/productos-desactivados.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { CategoriasDesactivadasComponent } from './pages/categorias-desactivadas/categorias-desactivadas.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { CrearVentaComponent } from './pages/crear-venta/crear-venta.component';
import { Page404Component } from './estados/page-404/page-404.component';
import { ComprobanteVentaComponent } from './pages/comprobante-venta/comprobante-venta.component';
import { ArtistasComponent } from './pages/artistas/artistas.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "inicio", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "productos", component: ProductosComponent },
  { path: "productos-desactivados", component: ProductosDesactivadosComponent },
  { path: "crear-producto", component: CrearProductoComponent },
  { path: "categorias", component: CategoriasComponent },
  { path: "categorias-desactivadas", component: CategoriasDesactivadasComponent },
  { path: "crear-categoria", component: CrearCategoriaComponent },
  { path: "ventas", component: VentasComponent },
  { path: "crear-venta", component: CrearVentaComponent },
  { path: "comprobante-venta", component: ComprobanteVentaComponent },
  { path: "paginacion", component:ArtistasComponent  },

  { path: "**", component: Page404Component } // Esta siempre debe ir al final
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

