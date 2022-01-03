export class Produto {
  constructor(id, descricao, preco, validade) {
    this.id = parseInt(id, 10);
    this.descricao = descricao;
    this.preco = parseFloat(preco);
    this.validade = validade;

    if (isNaN(this.id)
      || isNaN(this.preco)
      || !(this.validade instanceof Date)
      || isNaN(this.validade)) {

      throw new TypeError();
    }

    if (this.descricao.length === 0 || this.preco < 0) {
      throw new RangeError();
    }
  }

  vencido() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return this.validade < hoje;
  }
}