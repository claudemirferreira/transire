import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../pedido';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FiltroPaginacao } from 'src/app/shared/filtro.paginacao';
import { MatDialog } from '@angular/material/dialog';
import { ResponseApi } from 'src/app/shared/response-api';

@Component({
  selector: 'app-list-pedido',
  templateUrl: './list-pedido.component.html',
  styleUrls: ['./list-pedido.component.css'],
})
export class ListPedidoComponent implements OnInit {

  lista = new MatTableDataSource<Pedido>();
  pedido : Pedido;

  filtroPaginacao = new FiltroPaginacao();
  displayedColumns = ['id', 'nome', 'valor', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions: number[] = [5, 10, 20,];

  constructor(private service : PedidoService,
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
      this.lista = new MatTableDataSource<Pedido>(responseApi['content']);
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


  delete(pedido: Pedido) {
    return this.service.remove(pedido.id)
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
