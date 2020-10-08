
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from './components/material/material.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { VendaModule } from './venda/venda.module';
import { EntregadorModule } from './entregador/entregador.module';
import { ToastrModule } from 'ngx-toastr';

import { CrudService } from './shared/crud-service';
import { ProdutoService } from './produto/produto.service';
import { PedidoService } from './pedido/pedido.service';
import { ClienteService } from './cliente/cliente.service';
import { VendaService } from './venda/venda.service';
import { ItensService } from './pedido/itens.service';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListVendaComponent } from './venda/list-venda/list-venda.component';
import { CadastroVendaComponent } from './venda/cadastro-venda/cadastro-venda.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ListVendaComponent,
    CadastroVendaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    EntregadorModule,
    ProdutoModule,
    ClienteModule,
    VendaModule,
    PedidoModule,
    SharedModule,
    NgxUiLoaderModule,
    FlexLayoutModule,
    FlexModule,
    GridModule,
    AutocompleteLibModule,
    ToastrModule.forRoot(),


  ],
  providers: [
    CrudService,
    ProdutoService,
    PedidoService,
    ClienteService,
    VendaService,
    ItensService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
