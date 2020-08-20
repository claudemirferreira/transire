import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/produto/produto.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Produto } from 'src/app/produto/produto';

import { ResponseApi } from '../../shared/response-api';

@Component({
  selector: 'app-new-pedido',
  templateUrl: './new-pedido.component.html',
  styleUrls: ['./new-pedido.component.css']
})
export class NewPedidoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'acao', 'imagem', 'acoes'];
  keyword = 'nome';

  post: any = '';

  list : Produto[];
  stateCtrl : Produto;
  filterProduto: Produto = new Produto();

  formGroup = new FormControl();

  constructor(private produtoService : ProdutoService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    //this.ngxLoader.start();
    this.produtoService.listarTodos().subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['content'];
      console.log(JSON.stringify(this.list));
      //this.ngxLoader.stop();
    });
  }

  getErrorEmail() {
    return this.formGroup.get('quantidade').hasError('required') ? 'Field is required' :
        this.formGroup.get('quantidade').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  selectedclient(event) {
    console.log(event.option.value);
  }

  selectEvent(item) {
    // do something with selected item
    console.log('selectEvent');
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('onChangeSearch');
  }

  onFocused(e) {
    // do something
    console.log('onChangeSearch');
  }

  onSearchChange($event) {
    $event.stopPropagation();
  }

}
