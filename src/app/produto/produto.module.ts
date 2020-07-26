import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '../components/material/material.module';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ListProdutoComponent } from './list-produto/list-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';


@NgModule({
  declarations: [ListProdutoComponent, CadastroProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ProdutoModule { }
