import { ListEntregadorComponent } from './entregador/list-entregador/list-entregador.component';
import { ListProdutoComponent } from './produto/list-produto/list-produto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : 'list-produto', component : ListProdutoComponent},
  {path : 'list-entegador', component : ListEntregadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
