import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud-service';
import { Pedido } from '../pedido/pedido';
import { FiltroPaginacao } from '../shared/filtro.paginacao';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<Pedido>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}pedido/`);
  }

  listarTodos() {
    return this.http.get(`${this.API_URL}`);
  }

  pesquisar(filtro: FiltroPaginacao) {
    return this.http.post(`${this.API_URL}pesquisar`, filtro);
  }

  ///total
  findPedidoTotal(id: number) {
    return this.http.get(`${this.API_URL}${id}/total`).pipe(take(1));
  }

}
