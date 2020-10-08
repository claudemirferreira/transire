import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FiltroPaginacao } from '../shared/filtro.paginacao';
import { VendaProduto } from './venda-produto';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendaProdutoService extends CrudService<VendaProduto>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}venda-produto/`);
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

  incluir(record: VendaProduto) {
    return this.http.post(`${this.API_URL}incluir`, record).pipe(take(1));
  }

  findByVenda(idVenda) {
    return this.http.delete(`${this.API_URL}venda/${idVenda}`);
  }


}
