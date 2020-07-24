import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEntregadorComponent } from './list-entregador/list-entregador.component';

const routes: Routes = [
  {path : 'list-entregador', component : ListEntregadorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregadorRoutingModule { }
