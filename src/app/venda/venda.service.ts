import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FiltroPaginacao } from '../shared/filtro.paginacao';
import { Venda } from './venda';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendaService extends CrudService<Venda>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}venda/`);
  }

  loadByID(id) {
    return null;
  }

  listarTodos() {
    console.log('listarTodos');
    return this.http.get(`${this.API_URL}`);
  }

  pesquisar(filtro: FiltroPaginacao) {
    console.log(`${this.API_URL}pesquisa`);
    return this.http.post(`${this.API_URL}pesquisar`, filtro);
  }

  findPedidoTotal(id: number) {
    return this.http.get(`${this.API_URL}${id}/fechar`).pipe(take(1));
  }

}
