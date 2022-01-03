// import { calculadoraDeEntrega } from './calculadoraDeEntrega.js';
import { Produto } from './produto.js';
import { Sacola } from './sacola.js';

let caso;
let esperado;
let obtido;

function passou(extra = '') {
  let msg = caso;
  if (extra.length > 0) msg += ': ' + extra;
  console.log(`🟢 Passou: ${msg}`);
}
function falhou(extra = '') {
  let msg = caso;
  if (extra.length > 0) msg += ': ' + extra;
  console.error(`🟥 Falhou: ${msg}\n\tEsperado: ${esperado}\n\tObtido: ${obtido}`);
}

const venc1 = new Date(2021, 4, 1); // 01/05/2021
const venc2 = new Date(2021, 2, 1); // 01/03/2021

class ProdutoDouble extends Produto {
  vencido() {
    const data = new Date(2021, 3, 1); // 01/04/2021
    return this.validade < data;
  }
}

function calculadoraDeEntregaDouble() {
  return new Promise(resolve => { resolve(0); });
}

const prod1 = new ProdutoDouble(1, 'Leite integral 1L', 4, venc1);
const prod2 = new ProdutoDouble(2, 'Leite desnatado 1L', 5, venc1);
const prod3 = new ProdutoDouble(3, 'Pão de forma', 8, venc1);
const prod4 = new ProdutoDouble(4, 'Requeijão cremoso', 6, venc1);
const prod5 = new ProdutoDouble(5, 'Iogurte natural', 4, venc2); // vencido

const sacola = new Sacola({ calculadoraDeEntrega: calculadoraDeEntregaDouble });
// const sacola = new Sacola({ calculadoraDeEntrega });


(async () => {

  caso = 'Adicionar um item e conferir se ele consta na sacola';
  sacola.adicionarItem(prod1, 2);
  esperado = '[{"produto":{"id":1,"descricao":"Leite integral 1L","preco":4,"validade":"2021-05-01T03:00:00.000Z"},"quantidade":2}]';
  obtido = JSON.stringify(sacola.obterItens());
  if (esperado === obtido) {
    passou('objeto');
  } else {
    falhou('objeto');
  }

  esperado = 8;
  obtido = await sacola.valorTotal();
  if (esperado === obtido) {
    passou('valor total');
  } else {
    falhou('valor total');
  }


  caso = 'Adicionar mais itens e conferir o valor total';
  sacola.adicionarItem(prod2, 2);
  sacola.adicionarItem(prod3, 2);
  sacola.adicionarItem(prod4, 2);
  esperado = 46;
  obtido = await sacola.valorTotal();
  if (esperado === obtido) {
    passou();
  } else {
    falhou();
  }

  caso = 'Remover um item e conferir o valor total';
  sacola.removerItem(2); // Leite desnatado 1L, valor: 10
  esperado = 36;
  obtido = await sacola.valorTotal();
  if (esperado === obtido) {
    passou();
  } else {
    falhou();
  }


  caso = 'Adicionar mais unidades de um produto existente';
  sacola.adicionarItem(prod1, 1);
  esperado = 3;
  obtido = sacola.obterItem(1).quantidade;
  if (esperado === obtido) {
    passou();
  } else {
    falhou();
  }


  caso = 'Emitir erro ao tentar inserir produto vencido';
  esperado = '';
  obtido = '';
  try {
    sacola.adicionarItem(prod5, 1);
    falhou()
  } catch (e) {
    passou()
  }

})();