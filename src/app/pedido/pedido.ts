
export class Pedido {

  id : number;
  nome : string;
  endereco: string;
  telefone: string;
  valor : number;
  valorPagamento : number;
  tipoPedido: string;
  status: string;
  tipoPagamento: string;
  data: Date;
  dataEntrega: Date;

  public getTipoPedido(){
    return 'teste';
  }

}
