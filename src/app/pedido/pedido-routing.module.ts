import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPedidoComponent } from './list-pedido/list-pedido.component';

const routes: Routes = [
  {path : 'list-pedido', component : ListPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
