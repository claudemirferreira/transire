import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPedidoComponent } from './list-pedido/list-pedido.component';
import { NewPedidoComponent } from './new-pedido/new-pedido.component';

const routes: Routes = [
  {path : 'list-pedido', component : ListPedidoComponent},
  {path : 'new-pedido', component : NewPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
