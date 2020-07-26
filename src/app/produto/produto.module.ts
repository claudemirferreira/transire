import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ListProdutoComponent } from './list-produto/list-produto.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [ListProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NgxUiLoaderModule,
  ]
})
export class ProdutoModule { }
