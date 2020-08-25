

export class Produto {

  id : number;
  nome: string;
  descricao: string;
  valor: number;
  quantidade: number;
  total: number;
  sequencia : number;

  constructor(){
    this.quantidade = 1;
    this.nome = '';
    this.descricao = '';
  }

}
