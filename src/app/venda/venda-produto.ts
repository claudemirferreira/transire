import { Venda } from '../venda/venda';
import { Produto } from '../produto/produto';

export class VendaProduto {

  id: number;
  venda: Venda;
  produto: Produto;
  quantidade: number;
  valor: number;

}
