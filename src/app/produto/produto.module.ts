import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ListProdutoComponent } from './list-produto/list-produto.component';


@NgModule({
  declarations: [ListProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule
  ]
})
export class ProdutoModule { }
