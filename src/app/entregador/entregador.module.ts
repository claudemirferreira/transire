import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregadorRoutingModule } from './entregador-routing.module';
import { ListEntregadorComponent } from './list-entregador/list-entregador.component';


@NgModule({
  declarations: [ListEntregadorComponent],
  imports: [
    CommonModule,
    EntregadorRoutingModule
  ]
})
export class EntregadorModule { }
