import { PedidoProduto } from '../pedido-produto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'src/app/produto/produto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/produto/produto';

import { ResponseApi } from '../../shared/response-api';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from '../pedido';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PedidoService } from '../pedido.service';


@Component({
  selector: 'app-new-pedido',
  templateUrl: './new-pedido.component.html',
  styleUrls: ['./new-pedido.component.css'],
})
export class NewPedidoComponent implements OnInit {

  nome: FormGroup;
  tipoPedido: FormGroup;
  pedido: Pedido;

  public listTipo = [
    {"id": 1, "nome": "DELIVERY"},
    {"id": 2, "nome": "IFOOD"}
  ];

  constructor(
    private service : PedidoService,
    private _formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.pedido = new Pedido();

    this.tipoPedido = this._formBuilder.group({
      tipoPedido: ['', Validators.required]
    });
  }

  buscarInventario() {
    this.service.save(this.pedido).subscribe(
      (data: Pedido) => {
        this.pedido = data;
        console.log(JSON.stringify(this.pedido));
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

}
