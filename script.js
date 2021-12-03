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

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}
const apagaOl = () => {
  ol.innerText = '';
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
  }
}
function addEvento() {
  const items = document.querySelectorAll('.item');
  items.forEach((it) => it.addEventListener('click', addToCart));
}
async function callFetchProducts() {
  const prodFetch = await fetchProducts();
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
window.onload = () => {
  callFetchProducts();
};
