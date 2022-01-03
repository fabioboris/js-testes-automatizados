const _itens = [];
const _props = {};

export function Sacola(props) {
  if (props !== undefined) {
    for (const key in props) {
      _props[key] = props[key];
    }
  }
}


Sacola.prototype.adicionarItem = function (produto, quantidade) {
  if (produto.vencido()) {
    throw new RangeError(`Produto ${produto.id} vencido em ${produto.validade.toLocaleDateString('pt-BR')}`);
  }

  let item = _itens.find(item => item.produto.id === produto.id);
  if (item !== undefined) {
    item.quantidade += quantidade;
  } else {
    _itens.push({ produto, quantidade });
  }
}

Sacola.prototype.removerItem = function (produtoId) {
  const index = _itens.findIndex(item => item.produto.id === produtoId);
  if (index >= 0) {
    _itens.splice(index, 1);
  }
}

Sacola.prototype.obterItem = function (produtoId) {
  return _itens.find(item => item.produto.id === produtoId);
}

Sacola.prototype.obterItens = function () {
  return _itens;
}

Sacola.prototype.valorTotal = async function () {
  let total = _itens
    .map(item => item.produto.preco * item.quantidade)
    .reduce((acc, cur) => acc + cur);

  let entrega = 0;
  const fn = _props['calculadoraDeEntrega'];
  if (fn !== undefined) {
    entrega = await fn();
  }

  return total + entrega;
}
