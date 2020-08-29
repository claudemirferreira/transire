import { PedidoProduto } from './../pedido-produto';
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
  keyword = 'nome';

  listProduto: Produto[];
  produto: Produto;
  item : Item;

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
      console.log(JSON.stringify(this.listProduto));
      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });

  }

  incluir(){

    this.item = new Item();
    this.item.idPedido = this.pedido.id;
    this.item.idProduto = this.produto.id;
    this.item.valor = this.produto.valor;
    this.item.quantidade = this.produto.quantidade;

    return this.service.saveItem(this.item)
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

  atualizarTotal(item){
    this.produto = item;
    this.produto.total = this.produto.quantidade * this.produto.valor;
    console.log(this.produto.total);
  }

  selectEvent(item) {
    // do something with selected item
    console.log('selectEvent');
    item.quantidade = this.produto.quantidade;
    this.atualizarTotal(item);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('onChangeSearch');
  }

  onFocused(e){
    // do something when input is focused
    console.log('onFocused');
  }

}
