import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud-service';
import { Pedido } from '../pedido/pedido';
import { FiltroPaginacao } from '../shared/filtro.paginacao';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<Pedido>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}pedido/`);
  }

  loadByID(id) {
    return null;
  }

  listarTodos() {
    return this.http.get(`${this.API_URL}`);
  }

  pesquisar(filtro: FiltroPaginacao) {
    console.log(`${this.API_URL}pesquisa`);
    return this.http.post(`${this.API_URL}pesquisar`, filtro);
  }

}
