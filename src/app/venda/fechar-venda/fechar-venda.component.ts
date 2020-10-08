import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Cliente } from 'src/app/cliente/cliente';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { ResponseApi } from 'src/app/shared/response-api';
import { Venda } from '../venda';
import { VendaProdutoService } from '../venda-produto.service';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-fechar-venda',
  templateUrl: './fechar-venda.component.html',
  styleUrls: ['./fechar-venda.component.css']
})
export class FecharVendaComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente;

  venda: Venda;

  constructor(
    private service: VendaService,
    private clienteService: ClienteService,
    private vendaProdutoService: VendaProdutoService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<FecharVendaComponent>,
    @Inject(MAT_DIALOG_DATA) public idVenda: number) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.listaClientes();
    this.route.params.subscribe((params) => {
      this.service.findPedidoTotal(this.idVenda).subscribe(
        (responseApi: ResponseApi) => {
          this.venda = responseApi['content'];
        },
        (err) => {
          console.log(' error ');
        }
      );
    });
  }

  listaClientes() {
    this.clienteService.listarTodos().subscribe(
      (responseApi: ResponseApi) => {
        this.clientes = responseApi['content'];
        console.log(JSON.stringify(this.clientes));
      },
      (err) => {}
    );
  }

  fecharVenda(){
    console.log(this.venda);
    this.venda.cliente=this.cliente;
    return this.service.save(this.venda).subscribe(
      (responseApi: ResponseApi) => {
        this.venda = responseApi['content'];
        console.log(JSON.stringify(this.venda));
        this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Ocorreu um error!', 'Error');
        console.log(JSON.stringify(error));
      }
    );

  }

}
