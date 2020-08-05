import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '../components/material/material.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};

import { PedidoRoutingModule } from './pedido-routing.module';
import { ListPedidoComponent } from './list-pedido/list-pedido.component';

@NgModule({
  declarations: [ListPedidoComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MaterialModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class PedidoModule { }
