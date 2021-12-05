const ol = document.querySelector('.cart__items');
const btnRemove = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
const somarItem = () => {
  const li = document.querySelectorAll('.cart__item');
  let total = 0;
  li.forEach((lista) => {
    total += Number(lista.innerText.split('$')[1]);
    return total;
  });
  document.querySelector('.total-price').innerText = total;
};
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  somarItem();
  saveCartItems(ol.innerHTML);
}
const apagaOl = () => {
  ol.innerText = '';
  somarItem();
  saveCartItems(ol.innerHTML);
};
btnRemove.addEventListener('click', () => apagaOl());

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function addToCart(event) {
  if (event.target.className === 'item__add') {
    const idEvent = getSkuFromProductItem(event.path[1]);
    const itemFetch = await fetchItem(idEvent);
    const { id, title, price } = itemFetch;
    const itemCarrinho = createCartItemElement({
      sku: id,
      name: title,
      salePrice: price,
    });
    ol.appendChild(itemCarrinho);
    saveCartItems(ol.innerHTML);
    somarItem();
  }
}
function addEvento() {
  const items = document.querySelectorAll('.item');
  items.forEach((it) => it.addEventListener('click', addToCart));
}
async function callFetchProducts() {
  const data = await fetchProducts('computador');
  const prodFetch = data.results;
  prodFetch.forEach(({ id, title, thumbnail }) => {
    const pegaParametro = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    const item = document.querySelector('.items');
    item.appendChild(pegaParametro);
  });
  addEvento();
}
const f = () => {
  const li = document.querySelectorAll('.cart__item');
  li.forEach((lista) => {
    lista.addEventListener('click', cartItemClickListener);
  });
};
const pegaLocalStorage = () => {
  const data = getSavedCartItems();
  ol.innerHTML = data;
  f();
};
window.onload = async () => {
  pegaLocalStorage();
  await callFetchProducts();
  document.querySelector('.loading').remove();
  somarItem();
};
