import { Produto } from '../src/produto';

describe('Produtos', () => {
  test('Emitir um erro caso o id do produto não seja um número válido', () => {
    expect(() => { new Produto('', 'Leite', 1, new Date()) }).toThrow();
  });

  test('Emitir um erro caso o preço do produto não seja um número válido', () => {
    expect(() => { new Produto(1, 'Leite', '', new Date()) }).toThrow();
  });

  test('Emitir um erro caso o preço do produto seja um valor negativo', () => {
    expect(() => { new Produto(1, 'Leite', -1, new Date()) }).toThrow();
  });

  test('Emitir um erro caso o produto não tenha uma descrição', () => {
    expect(() => { new Produto(1, '', 1, new Date()) }).toThrow();
  });

  test('Emitir um erro caso a data de validade não seja um objeto válido', () => {
    expect(() => { new Produto(1, 'Leite', 1, '2021-01-01') }).toThrow();
    expect(() => { new Produto(1, 'Leite', 1, new Date(10000000000000000)) }).toThrow();
  });

  test('Verificar se um produto NÃO está vencido', () => {
    const produto = new Produto(1, 'Leite', 1, new Date(2021, 4, 1));
    const _Date = globalThis.Date;
    const DATA_ATUAL = new Date(2021, 3, 1);
    jest
      .spyOn(globalThis, 'Date')
      .mockImplementation(() => DATA_ATUAL);
    expect(produto.vencido()).toBeFalsy();
    globalThis.Date = _Date;
  });

  test('Verificar se um produto está vencido', () => {
    const produto = new Produto(1, 'Leite', 1, new Date(2000, 0, 1));
    expect(produto.vencido()).toBeTruthy();
  });
});
