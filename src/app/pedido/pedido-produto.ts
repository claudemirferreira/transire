import { Produto } from './../produto/produto';
import { Pedido } from './pedido';

export class PedidoProduto {

  id : number;
  quantidade : number;
  valor : number;
  pedido: Pedido;
  produto: Produto;

}
