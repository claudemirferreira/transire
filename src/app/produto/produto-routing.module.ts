import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProdutoComponent } from './list-produto/list-produto.component';

const routes: Routes = [
  {path : 'list-produto', component : ListProdutoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
