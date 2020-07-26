import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ProdutoService } from '../produto.service';
import { FiltroPaginacao } from '../../shared/filtro.paginacao';
import { Produto } from '../produto';
import { ResponseApi } from '../../../app/shared/response-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css']
})
export class ListProdutoComponent implements OnInit {

  lista = new MatTableDataSource<Produto>();

  filtroPaginacao = new FiltroPaginacao();

  displayedColumns = ['id', 'nome'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions: number[] = [5, 10, 20,];

  constructor(private service : ProdutoService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.filtroPaginacao.page = 0;
    this.filtroPaginacao.size = 5;
    this.filtroPaginacao.nome = '';

    this.pesquisar();
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  pesquisar(){
    console.log('############nome='+this.filtroPaginacao.nome)
    this.service.pesquisar(this.filtroPaginacao).subscribe((responseApi: ResponseApi) => {
      console.log(responseApi['content']);
      this.lista = new MatTableDataSource<Produto>(responseApi['content']);
      this.lista.sort = this.sort;

      this.filtroPaginacao.totalElements = responseApi['totalElements'];
      this.filtroPaginacao.pageSize = responseApi['totalPages'];
      this.filtroPaginacao.pageIndex = responseApi['number'];
      this.filtroPaginacao.pageSize = responseApi['size'];
      this.showSuccess();

      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });
  }

  pageChange($event) {
    this.filtroPaginacao.size = $event.pageSize;
    this.filtroPaginacao.page = $event.pageIndex
    console.log(this.filtroPaginacao.size);
    console.log(this.filtroPaginacao.page);
    this.pesquisar();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
