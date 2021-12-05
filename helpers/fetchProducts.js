const fetchProducts = async (produto) => {
  // seu código aqui
  try{
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`
 if(!url){
  throw new Error('You must provide an url');
 }

  const response = await fetch(url);
  const data = await response.json();
  return data;
  } catch (erro) {
    return erro
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
