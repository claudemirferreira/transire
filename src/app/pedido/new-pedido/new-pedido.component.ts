import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../pedido';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PedidoService } from '../pedido.service';
import { ItensComponent } from '../itens/itens.component';
import { MatDialog } from '@angular/material/dialog';

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
    {"id": 2, "nome": "IFOOD"},
    {"id": 3, "nome": "BALCÃO"}
  ];

  constructor(
    private service : PedidoService,
    private _formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.pedido = new Pedido();

    this.tipoPedido = this._formBuilder.group({
      tipoPedido: ['', Validators.required]
    });
  }

  salvar() {
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

  //intens
  openDialog(): void {
    this.pedido.id = 1;
    const dialogRef = this.dialog.open(ItensComponent, {
      width: '650px',
      data: this.pedido
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.pedido = result;
    });
  }

}
