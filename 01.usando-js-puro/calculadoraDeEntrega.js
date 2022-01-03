import fetch from 'node-fetch';

export async function calculadoraDeEntrega() {
  const url = 'https://www.random.org/integers/?num=1&min=0&max=10&col=1&base=10&format=plain';
  const response = await fetch(url);
  const text = await response.text();
  return parseInt(text, 10);
}