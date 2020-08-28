import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pedido } from '../pedido';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ItensService } from '../itens.service';
import { ResponseApi } from 'src/app/shared/response-api';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../item';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
  lista = new MatTableDataSource<Item>();
  displayedColumns = ['id', 'nome','quantidade', 'valor', 'acao'];

  constructor(
    private service : ItensService,
    public dialogRef: MatDialogRef<ItensComponent>,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public pedido: Pedido) { }

  ngOnInit(): void {
    this.findByProduto();
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

}
