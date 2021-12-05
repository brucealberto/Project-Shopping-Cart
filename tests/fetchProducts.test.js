require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('fTeste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const esperado = await fetchProducts('computador');
    expect(esperado).toEqual(computadorSearch);
  });
  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
    const esperado = await fetchProducts();
    const erro = new Error('You must provide an url');
    expect(esperado).toEqual(erro);
  });
});
