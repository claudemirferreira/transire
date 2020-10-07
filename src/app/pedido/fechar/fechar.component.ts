import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResponseApi } from 'src/app/shared/response-api';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';
import EnumTipoPagamento from '../../shared/enum/EnumStatusPagamento';

@Component({
  selector: 'app-fechar',
  templateUrl: './fechar.component.html',
  styleUrls: ['./fechar.component.css'],
})
export class FecharComponent implements OnInit {
  pedido: Pedido;

  public listTipoPagamento = [
    { id: '1', nome: 'A VISTA' },
    { id: '2', nome: 'CARTÃO' },
    { id: '3', nome: 'IFOOD' },
  ];

  constructor(
    private service: PedidoService,
    private ngxLoader: NgxUiLoaderService,
    public dialogRef: MatDialogRef<FecharComponent>,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public idPedido: number
  ) {}

  ngOnInit() {
    console.log(this.idPedido);
    this.route.params.subscribe((params) => {
      this.service.findPedidoTotal(this.idPedido).subscribe(
        (responseApi: ResponseApi) => {
          this.pedido = responseApi['content'];
          console.log(' pedido= ' + this.pedido.tipoPedido);
        },
        (err) => {
          console.log(' error ');
        }
      );
    });
  }

  efetuarPagamento(){

    EnumTipoPagamento.
    console.log(JSON.stringify(this.pedido));

  }
}
