import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '../components/material/material.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { RelatorioComponent } from './relatorio/relatorio.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

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
  declarations: [CadastroClienteComponent, ListClienteComponent, RelatorioComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    FormsModule,
    PdfJsViewerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class ClienteModule { }
