import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pedido } from '../pedido';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ItensService } from '../itens.service';
import { ResponseApi } from 'src/app/shared/response-api';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../item';
import { Produto } from 'src/app/produto/produto';
import { ProdutoService } from 'src/app/produto/produto.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
  keyword = 'name';

  listProduto: Produto[];

  produto: Produto;

  lista = new MatTableDataSource<Item>();
  displayedColumns = ['nome','quantidade', 'valor', 'acao'];

  constructor(
    private service : ItensService,
    private produtoService : ProdutoService,
    public dialogRef: MatDialogRef<ItensComponent>,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public pedido: Pedido) { }

  ngOnInit(): void {
    this.findByProduto();
    this.listarTodos();
    this.produto = new Produto();
  }

  findByProduto(){
    this.ngxLoader.start();
    this.service.findByProduto(this.pedido.id).subscribe((responseApi: ResponseApi) => {
      console.log(responseApi['content']);
      this.lista = new MatTableDataSource<Item>(responseApi['content']);
      console.log(JSON.stringify(this.lista));
      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });
  }

  listarTodos(){
    this.ngxLoader.start();
    this.produtoService.listarTodos().subscribe((responseApi: ResponseApi) => {
      console.log(responseApi['content']);
      this.listProduto = responseApi['content'];
      console.log(JSON.stringify(this.lista));
      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });

  }



  delete(item: Item) {
    return this.service.remove(item.id)
      .subscribe(() => {
        console.log('saved');
        this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
        this.findByProduto();
      },
        error => {
          this.toastr.error('Ocorreu um error!', 'Error');
          console.log(JSON.stringify(error));
        }

      );
  }

  atualizarTotal(){
    this.produto.total = this.produto.quantidade * this.produto.valor;
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

}
