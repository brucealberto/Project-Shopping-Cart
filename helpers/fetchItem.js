const fetchItem = async (id) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    if (!response) throw new Error('You must provide an url');
    const data = await response.json();
    return data;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
