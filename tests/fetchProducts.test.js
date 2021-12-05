require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('Testar se fetchProducts foi chamada com argumento', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('Testar ao chamar fetchProdducts utiliza a função fetch usando o endpoint', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });

  test('Testar se o retorno de fetchProducts é uma estrutura de dados igual computadorSearch', async () => {
    const esperado = await fetchProducts('computador');
    expect(esperado).toEqual(computadorSearch);
  });

  test('Testar se retorna um erro', async () => {
    const esperado = await fetchProducts();
    const erro = new Error('You must provide an url');
    expect(esperado).toEqual(erro);
  });
});
