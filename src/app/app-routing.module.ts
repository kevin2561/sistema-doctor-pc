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

const routes: Routes = [
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
  { path: "", redirectTo: "/login", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

