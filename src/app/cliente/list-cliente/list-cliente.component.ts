import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ClienteService } from '../cliente.service';
import { FiltroPaginacao } from '../../shared/filtro.paginacao';
import { Cliente } from '../cliente';
import { CadastroClienteComponent } from '../cadastro-cliente/cadastro-cliente.component';

import { ResponseApi } from '../../../app/shared/response-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  lista = new MatTableDataSource<Cliente>();
  cliente : Cliente;

  filtroPaginacao = new FiltroPaginacao();
  displayedColumns = ['id', 'nome', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions: number[] = [5, 10, 20,];

  constructor(private service : ClienteService,
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
      this.lista = new MatTableDataSource<Cliente>(responseApi['content']);
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
    this.openDialogEditar(new Cliente() );
  }

  openDialogEditar(cliente : Cliente): void {
    this.cliente = cliente;
    console.log(JSON.stringify(cliente));
    const dialogRef = this.dialog.open(CadastroClienteComponent, {
      width: '650px',
      data: this.cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cliente = result;
    });
  }

  delete(cliente: Cliente) {
    return this.service.remove(cliente.id)
      .subscribe(() => {
        console.log('saved');
        this.showSuccess();
        this.pesquisar();
      },
        error => {
          this.toastr.error('Ocorreu um error!', 'Error');
          console.log(JSON.stringify(error));
        }

      );
  }

}
