import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProdutoService } from '../produto.service';
import { Produto } from '../produto';
import { ResponseApi } from '../../../app/shared/response-api';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css']
})
export class ListProdutoComponent implements OnInit {

  list$: Observable<Produto[]>;

  constructor(private service : ProdutoService) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe((responseApi: ResponseApi) => {
      this.list$ = responseApi['content'];
      console.log(JSON.stringify(this.list$));
    }, err => {
      console.log('################error');
    });

  }

  handleError() {

  }

}
