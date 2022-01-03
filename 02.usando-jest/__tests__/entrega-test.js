import { ENTREGA_URL } from "../config/entrega.config";
import { calcularEntrega } from "../src/entrega";

// import fetch from 'node-fetch';
// globalThis.fetch = fetch;

const _fetch = globalThis.fetch;

describe('Entrega', () => {
  beforeAll(() => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(0)
      })
    );

    jest.clearAllMocks();
  });

  afterAll(() => {
    globalThis.fetch = _fetch;
  });

  test('Obter o valor de entrega', async () => {
    expect(await calcularEntrega()).toBe(0);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(ENTREGA_URL);
  });
});