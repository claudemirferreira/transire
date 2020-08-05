
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from './components/material/material.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { EntregadorModule } from './entregador/entregador.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CrudService } from './shared/crud-service';
import { ProdutoService } from './produto/produto.service';
import { PedidoService } from './pedido/pedido.service';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CadastroProdutoComponent } from './produto/cadastro-produto/cadastro-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    EntregadorModule,
    ProdutoModule,
    PedidoModule,
    SharedModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),


  ],
  providers: [
    CrudService,
    ProdutoService,
    PedidoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
