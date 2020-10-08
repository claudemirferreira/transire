import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Cliente } from 'src/app/cliente/cliente';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { ResponseApi } from 'src/app/shared/response-api';
import { VendaService } from '../venda.service';
import { Venda } from '../venda';
import { ProdutoService } from 'src/app/produto/produto.service';
import { VendaProdutoService } from 'src/app/venda/venda-produto.service';
import { Produto } from 'src/app/produto/produto';
import { VendaProduto } from 'src/app/venda/venda-produto';
import { MatTableDataSource } from '@angular/material/table';
import { FecharVendaComponent } from '../fechar-venda/fechar-venda.component';

@Component({
  selector: 'app-cadastro-venda',
  templateUrl: './cadastro-venda.component.html',
  styleUrls: ['./cadastro-venda.component.css'],
})
export class CadastroVendaComponent implements OnInit {
  produtos: Produto[];
  produto: Produto;

  venda: Venda;

  lista = new MatTableDataSource<VendaProduto>();


  displayedColumns = ['nome', 'quantidade', 'valor', 'acao'];

  vendaProduto: VendaProduto;

  pageSizeOptions: number[] = [5, 10, 20];

  constructor(
    private service: VendaService,
    private clienteService: ClienteService,
    private vendaProdutoService: VendaProdutoService,
    private produtoService: ProdutoService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.venda = new Venda();
    this.vendaProduto = new VendaProduto();
    this.produto = new Produto();
    this.listaProdutos();
  }

  listaProdutos() {
    this.produtoService.listarTodos().subscribe(
      (responseApi: ResponseApi) => {
        this.produtos = responseApi['content'];
      },
      (err) => {}
    );
  }

  atualizarTotal(produto) {
    this.vendaProduto.valor = this.vendaProduto.quantidade * produto.valor;
    this.vendaProduto.quantidade = this.vendaProduto.quantidade;
    console.log(this.vendaProduto.valor);
  }

  incluir() {
    if (this.venda.id === undefined) {
      this.venda.data = new Date();
      return this.service.save(this.venda).subscribe(
        (responseApi: ResponseApi) => {
          this.venda = responseApi['content'];
          console.log(JSON.stringify(this.venda));
          this.incluirItem();
        },
        (error) => {
          this.toastr.error('Ocorreu um error!', 'Error');
          console.log(JSON.stringify(error));
        }
      );
    } else {
      this.incluirItem();
    }
  }

  incluirItem() {
    this.vendaProduto.venda = this.venda;
    this.vendaProduto.produto = this.produto;
    return this.vendaProdutoService.incluir(this.vendaProduto).subscribe(
      (responseApi: ResponseApi) => {
        this.lista = new MatTableDataSource<VendaProduto>(responseApi['content']);
      },
      (error) => {
        this.toastr.error('Ocorreu um error!', 'Error');
        console.log(JSON.stringify(error));
      }
    );
  }


  delete(item: VendaProduto) {
    return this.vendaProdutoService.remove(item.id)
      .subscribe(
        (responseApi: ResponseApi) => {
        this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
        this.findByVenda(item.venda.id);
      },
        error => {
          this.toastr.error('Ocorreu um error!', 'Error');
          console.log(JSON.stringify(error));
        }
      );
  }

  findByVenda(idVenda: number){
    this.ngxLoader.start();
    this.vendaProdutoService.findByVenda(idVenda).subscribe((responseApi: ResponseApi) => {
      console.log(responseApi['content']);
      this.lista = new MatTableDataSource<VendaProduto>(responseApi['content']);
      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });
  }

  openDialogFechar(): void {
    console.log('this.pedido.id'+this.venda.id)
    const dialogRef = this.dialog.open(FecharVendaComponent, {
      width: '650px',
      height: '550px',
      data: this.venda.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.pedido = result;
    });
  }

}
