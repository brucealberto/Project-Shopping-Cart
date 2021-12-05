require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('executar fetchItem com argumento', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('testar fetchItem se usa endpoint', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527'
    );
  });

  test('se retorno de fetchItem é uma estrutura igual item', async () => {
    const esperado = await fetchItem('MLB1615760527');
    expect(esperado).toEqual(item);
  });

  test('Testar se retorna um erro', async () => {
    const esperado = await fetchItem();
    const erro = new Error('You must provide an url');
    expect(esperado).toEqual(erro);
  });
});
