import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClienteComponent } from './list-cliente/list-cliente.component';

const routes: Routes = [
  {path : 'list-cliente', component : ListClienteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
