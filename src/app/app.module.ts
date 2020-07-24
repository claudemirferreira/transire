
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { ProdutoModule } from './produto/produto.module';
import { EntregadorModule } from './entregador/entregador.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CrudService } from './shared/crud-service';
import { ProdutoService } from './produto/produto.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EntregadorModule,
    ProdutoModule,
    SharedModule
  ],
  providers: [
    CrudService,
    ProdutoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
