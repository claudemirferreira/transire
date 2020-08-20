import { PedidoProduto } from '../pedido-produto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'src/app/produto/produto.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { startWith, map, takeUntil, take } from 'rxjs/operators';
import { Produto } from 'src/app/produto/produto';

import { ResponseApi } from '../../shared/response-api';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-new-pedido',
  templateUrl: './new-pedido.component.html',
  styleUrls: ['./new-pedido.component.css']
})
export class NewPedidoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'acao', 'imagem', 'acoes'];
  keyword = 'nome';

  post: any = '';

  stateCtrl : Produto;
  filterProduto: Produto = new Produto();

  /** list of banks */
  protected list: Produto[] ;

  /** control for the selected bank */
  public produtoCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public produtoFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredProdutos: ReplaySubject<Produto[]> = new ReplaySubject<Produto[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  //
  pedidoProduto : PedidoProduto;
  pedidoProdutos : PedidoProduto[];


  constructor(private produtoService : ProdutoService,
    private formBuilder: FormBuilder) {
      this.pesquisar();
    }

  init(){
    // set initial selection
    this.produtoCtrl.setValue(this.list[6]);

    // load the initial bank list
    this.filteredProdutos.next(this.list.slice());

    // listen for search field value changes
    this.produtoFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProdutos();
      });
  }

  ngOnInit() {
    this.pedidoProduto = new PedidoProduto();
    this.pedidoProdutos = [];
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredProdutos
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Produto, b: Produto) => a && b && a.id === b.id;
      });
  }

  protected filterProdutos() {
    if (!this.list) {
      return;
    }
    // get the search keyword
    let search = this.produtoFilterCtrl.value;
    if (!search) {
      this.filteredProdutos.next(this.list.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredProdutos.next(
      this.list.filter(produto => produto.nome.toLowerCase().indexOf(search) > -1)
    );
  }

  pesquisar() {
    //this.ngxLoader.start();
    this.produtoService.listarTodos().subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['content'];
      console.log(JSON.stringify(this.list));
      this.init();
      //this.ngxLoader.stop();
    });
  }

  incluir(){
    //this.pedidoProduto.produto = this.produtoCtrl;
    console.log()

  }


}
