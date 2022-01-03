import { calcularEntrega } from '../src/entrega';
import { Produto } from '../src/produto';
import { Sacola } from '../src/sacola';

jest.mock('../src/entrega');


describe('Sacola', () => {

  const sacola = new Sacola({ calculadoraDeEntrega: calcularEntrega });

  const DATA_FUTURA = new Date(2020, 4, 1);
  const DATA_PRESENTE = new Date(2020, 3, 1);
  const DATA_PASSADA = new Date(2020, 2, 1);

  const produtos = [];


  beforeEach(() => {
    calcularEntrega.mockClear();
  });

  beforeAll(() => {
    jest.spyOn(Produto.prototype, 'vencido').mockImplementation(function () {
      return this.validade < DATA_PRESENTE;
    });

    produtos.push(new Produto(1, 'Leite integral 1L', 4, DATA_FUTURA));
    produtos.push(new Produto(2, 'Leite desnatado 1L', 5, DATA_FUTURA));
    produtos.push(new Produto(3, 'Pão de forma', 8, DATA_FUTURA));
    produtos.push(new Produto(4, 'Requeijão cremoso', 6, DATA_FUTURA));
    produtos.push(new Produto(5, 'Iogurte natural', 4, DATA_PASSADA));

    calcularEntrega.mockImplementation(() => 0);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });


  test('Adicionar o primeiro item, conferir se ele consta na sacola, e se o valor total está correto', async () => {
    sacola.adicionarItem(produtos[0], 2);
    expect(sacola.obterItens()).toMatchSnapshot();
    expect(calcularEntrega).not.toHaveBeenCalled();

    const valorEsperado = 8;
    const valorObtido = await sacola.valorTotal();
    expect(valorObtido).toBe(valorEsperado);
    expect(calcularEntrega).toHaveBeenCalled();
  });

  test('Adicionar mais itens e conferir o valor total', async () => {
    sacola.adicionarItem(produtos[1], 2);
    sacola.adicionarItem(produtos[2], 2);
    sacola.adicionarItem(produtos[3], 2);

    const valorEsperado = 46;
    const valorObtido = await sacola.valorTotal();
    expect(valorObtido).toBe(valorEsperado);
    expect(calcularEntrega).toHaveBeenCalledTimes(1);
  });

  test('Remover um item e conferir o valor total', async () => {
    sacola.removerItem(2); // Leite desnatado 1L, valor: 10
    const valorEsperado = 36;
    const valorObtido = await sacola.valorTotal();
    expect(valorObtido).toBe(valorEsperado);
  });

  test('Adicionar mais unidades de um produto existente e conferir a quantidade', () => {
    sacola.adicionarItem(produtos[0], 1);
    const quantidadeEsperada = 3;
    const quantidadeObtida = sacola.obterItem(1).quantidade;
    expect(quantidadeEsperada).toBe(quantidadeObtida);
  });

  test('Emitir um erro ao tentar inserir um produto com prazo de validade vencido', () => {
    expect(() => { sacola.adicionarItem(produtos[4], 1) }).toThrow();
  });
});
