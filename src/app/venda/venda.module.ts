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

import { VendaRoutingModule } from './venda-routing.module';
import { ListVendaComponent } from './list-venda/list-venda.component';
import { CadastroVendaComponent } from './cadastro-venda/cadastro-venda.component';
import { FecharVendaComponent } from './fechar-venda/fechar-venda.component';



@NgModule({
  declarations: [FecharVendaComponent],
  imports: [
    CommonModule,
    VendaRoutingModule,
    MaterialModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})

export class VendaModule { }
