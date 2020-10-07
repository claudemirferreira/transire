import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../pedido';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PedidoService } from '../pedido.service';
import { ItensComponent } from '../itens/itens.component';
import { MatDialog } from '@angular/material/dialog';
import { FecharComponent } from '../fechar/fechar.component';
import { ResponseApi } from 'src/app/shared/response-api';
import { ActivatedRoute, Router } from '@angular/router';

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
    {"id": "1", "nome": "DELIVERY"},
    {"id": "2", "nome": "IFOOD"},
    {"id": "3", "nome": "BALCÃO"}
  ];

  constructor(
    private service : PedidoService,
    private _formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.tipoPedido = this._formBuilder.group({
      tipoPedido: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      var id = params['id'];
      if (!id){
        this.pedido = new Pedido();
        this.pedido.status = '0';
      } else {
        this.service.loadByID(id).subscribe((responseApi: ResponseApi) => {
          this.pedido = responseApi['content'];
          console.log('this.pedido='+this.pedido.tipoPedido);
        }, err => {
          console.log('################error');
        });

      }
    });
  }

  salvar() {
    if(this.pedido.data == null){
      this.pedido.data = new Date();
      this.pedido.dataEntrega = new Date();
      this.pedido.dataEntrega.setHours (this.pedido.dataEntrega.getHours() + 1);
    }

    this.service.save(this.pedido).subscribe(
      (responseApi: ResponseApi) => {
        this.pedido = responseApi['content'];
        console.log(JSON.stringify(this.pedido));
        this.openDialogItem();
      },
      (err) => {
        console.log('ERROR =' + err);
      }
    );
  }

  //intens
  openDialogItem(): void {
    console.log('this.pedido.id'+this.pedido.id)
    const dialogRef = this.dialog.open(ItensComponent, {
      width: '650px',
      height: '550px',
      data: this.pedido.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogFechar(): void {
    console.log('this.pedido.id'+this.pedido.id)
    const dialogRef = this.dialog.open(FecharComponent, {
      width: '650px',
      height: '550px',
      data: this.pedido.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.pedido = result;
    });
  }

}
