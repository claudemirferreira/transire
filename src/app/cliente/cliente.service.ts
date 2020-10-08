import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';
import { FiltroPaginacao } from '../shared/filtro.paginacao';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cliente/`);
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
