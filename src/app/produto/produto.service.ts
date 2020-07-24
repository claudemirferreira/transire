import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Produto } from '../produto/produto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends CrudService<Produto>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}produto`);
  }

  loadByID(id) {
    return null;
  }

  listarTodos() {
    return this.http.get(`${environment.API}produto`);
  }

}
