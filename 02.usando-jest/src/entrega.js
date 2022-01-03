import { ENTREGA_URL } from '../config/entrega.config';

export async function calcularEntrega() {
  const response = await fetch(ENTREGA_URL);
  const text = await response.text();
  return parseInt(text, 10);
}