import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
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

@NgModule({
  declarations: [CadastroClienteComponent, ListClienteComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class ClienteModule { }
