import { Produto } from './produto.js';

let prod;
let caso;

function passou(extra = '') {
  let msg = caso;
  if (extra.length > 0) msg += ': ' + extra;
  console.log(`🟢 Passou: ${msg}`);
}
function falhou(extra = '') {
  let msg = caso;
  if (extra.length > 0) msg += ': ' + extra;
  console.error(`🟥 Falhou: ${msg}`);
}


caso = 'Emitir um erro caso o id do produto não seja um número válido';
try {
  prod = new Produto('', 'Caneta', 1, new Date());
  falhou();
} catch (e) {
  passou();
}


caso = 'Emitir um erro caso o preço do produto não seja um número válido';
try {
  prod = new Produto(1, 'Caneta', '', new Date());
  falhou();
} catch (e) {
  passou();
}


caso = 'Emitir um erro caso o preço do produto seja um valor negativo';
try {
  prod = new Produto(1, 'Caneta', -1, new Date());
  falhou();
} catch (e) {
  passou();
}


caso = 'Emitir um erro caso o produto não tenha uma descrição';
try {
  prod = new Produto(1, '', 1, new Date());
  falhou();
} catch (e) {
  passou();
}


caso = 'Emitir um erro caso a data de validade não seja um objeto válido';
try {
  prod = new Produto(1, 'Caneta', 1, '2021-01-01');
  falhou('string');
  prod = new Produto(1, 'Caneta', 1, new Date(10000000000000000));
  falhou('número grande');
} catch (e) {
  passou();
}
