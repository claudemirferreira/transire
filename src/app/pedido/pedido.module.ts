import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
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
import { NewPedidoComponent } from './new-pedido/new-pedido.component';

@NgModule({
  declarations: [ListPedidoComponent, NewPedidoComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    AutocompleteLibModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class PedidoModule { }
