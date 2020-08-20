import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Produto } from '../produto/produto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FiltroPaginacao } from '../shared/filtro.paginacao';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends CrudService<Produto>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}produto/`);
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

}
