import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FecharComponent } from './fechar/fechar.component';
import { ListPedidoComponent } from './list-pedido/list-pedido.component';
import { NewPedidoComponent } from './new-pedido/new-pedido.component';

const routes: Routes = [
  {path : 'list-pedido', component : ListPedidoComponent},
  {path : 'new-pedido', component : NewPedidoComponent},
  {path : 'new-pedido/:id', component: NewPedidoComponent},
  {path : 'new-pedido/:id/total', component: FecharComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
