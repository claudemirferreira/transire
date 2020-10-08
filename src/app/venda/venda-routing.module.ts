import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroVendaComponent } from './cadastro-venda/cadastro-venda.component';
import { ListVendaComponent } from './list-venda/list-venda.component';

const routes: Routes = [
  {path : 'list-venda', component : ListVendaComponent},
  {path : 'new-venda', component : CadastroVendaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendaRoutingModule { }
