import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud-service';
import { PedidoProduto } from '../pedido/pedido-produto';

@Injectable({
  providedIn: 'root'
})
export class ItensService extends CrudService<PedidoProduto>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}pedido-produto/`);
  }

  loadByID(id) {
    return null;
  }

  listarTodos() {
    return this.http.get(`${this.API_URL}`);
  }

  findByProduto(idPedido) {
    return this.http.get(`${this.API_URL}pedido/${idPedido}`);
  }

}
