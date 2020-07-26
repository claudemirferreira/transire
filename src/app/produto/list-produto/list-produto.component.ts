import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ProdutoService } from '../produto.service';
import { FiltroPaginacao } from '../../shared/filtro.paginacao';
import { Produto } from '../produto';
import { CadastroProdutoComponent } from '../cadastro-produto/cadastro-produto.component';

import { ResponseApi } from '../../../app/shared/response-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css']
})
export class ListProdutoComponent implements OnInit {

  lista = new MatTableDataSource<Produto>();
  produto : Produto;

  filtroPaginacao = new FiltroPaginacao();
  displayedColumns = ['id', 'nome', 'valor', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions: number[] = [5, 10, 20,];

  constructor(private service : ProdutoService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

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
    this.ngxLoader.start();
    this.service.pesquisar(this.filtroPaginacao).subscribe((responseApi: ResponseApi) => {
      console.log(responseApi['content']);
      this.lista = new MatTableDataSource<Produto>(responseApi['content']);
      this.lista.sort = this.sort;

      this.filtroPaginacao.totalElements = responseApi['totalElements'];
      this.filtroPaginacao.pageSize = responseApi['totalPages'];
      this.filtroPaginacao.pageIndex = responseApi['number'];
      this.filtroPaginacao.pageSize = responseApi['size'];

      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });
  }

  pageChange($event) {
    this.filtroPaginacao.size = $event.pageSize;
    this.filtroPaginacao.page = $event.pageIndex
    this.pesquisar();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  showSuccess() {
    this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
  }

  openDialog(): void {
    this.openDialogEditar(new Produto() );

  }

  openDialogEditar(produto : Produto): void {
    this.produto = produto;
    console.log(JSON.stringify(produto));
    const dialogRef = this.dialog.open(CadastroProdutoComponent, {
      width: '500px',
      data: this.produto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.produto = result;
    });
  }

  delete(produto: Produto) {
    return this.service.remove(produto.id)
      .subscribe(() => {
        console.log('saved');
        this.showSuccess();
        this.pesquisar();
      },
        error => {
          alert('Erro, existe rotina associada a este perfil');
          console.log(JSON.stringify(error));
        }

      );
  }

}
