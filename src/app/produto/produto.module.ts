import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from '../components/material/material.module';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ListProdutoComponent } from './list-produto/list-produto.component';


@NgModule({
  declarations: [ListProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    NgxUiLoaderModule,
    FormsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
  ]
})
export class ProdutoModule { }
