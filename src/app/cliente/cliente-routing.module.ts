import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
  {path : 'list-cliente', component : ListClienteComponent},
  {path : 'relatorio', component : RelatorioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
