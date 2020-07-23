import { ProdutoModule } from './produto/produto.module';
import { EntregadorModule } from './entregador/entregador.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntregadorModule,
    ProdutoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
