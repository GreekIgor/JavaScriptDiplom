import {createElement, createIcon, createImage} from './components.js'
import basket from '../basket.js';



// Кнопка "В корзину"
function createAddToCartButton() {
  const btn = createElement('a', 'product-card__link btn btn--icon', { href: '#' });
  const span = createElement('span', 'btn__text', { text: 'В корзину' });
  btn.append(span, createIcon('icon-basket'));
  return btn;
}

function createDetailsButton() {
  const btn = createElement('a', 'product-card__link btn btn--secondary', { href: '#' });
  const span = createElement('span', 'btn__text', { text: 'Подробнее' });
  btn.appendChild(span);
  return btn;
}

function createMoreActions(product) {
  const div = createElement('div', 'product-card__more');
  const cardButton = createAddToCartButton();

  cardButton.addEventListener('click', ()=>{
       basket.addProduct(product)
       console.log(basket.getProducts())
  })
  div.append(cardButton, createDetailsButton());
  return div;
}

// Изображение товара
function createProductImage(src) {
  return createElement('img', 'product-card__img', {
    src,
    width: 290,
    height: 436,
    alt: 'Изображение товара'
  });
}

function createVisualBlock(product) {
  const div = createElement('div', 'product-card__visual');
  div.append(createProductImage(product.image), createMoreActions(product));
  return div;
}

// Старая цена
function createOldPrice(oldPrice) {
  if (!oldPrice) return null;
  const span = createElement('span', 'product-card__old');
  const number = createElement('span', 'product-card__old-number', { text: oldPrice.toLocaleString('ru-RU') });
  const currency = createElement('span', 'product-card__old-add', { text: '₽' });
  span.append(number, currency);
  return span;
}

function createPrice(newPrice) {
  const span = createElement('span', 'product-card__price');
  const number = createElement('span', 'product-card__price-number', { text: newPrice.toLocaleString('ru-RU') });
  const currency = createElement('span', 'product-card__price-add', { text: '₽' });
  span.append(number, currency);
  return span;
}

// Tooltip (подсказка с наличием)
function createTooltip(availability) {
  const cityNames = {
    moscow: 'Москва',
    orenburg: 'Оренбург',
    saintPetersburg: 'Санкт-Петербург'
  };

  const tooltip = createElement('div', 'product-card__tooltip tooltip');

  const btn = createElement('button', 'tooltip__btn', { 'aria-label': 'Показать подсказку' });
  btn.appendChild(createIcon('icon-i', 5, 10));
  tooltip.appendChild(btn);

  const content = createElement('div', 'tooltip__content');
  const title = createElement('span', 'tooltip__text', { text: 'Наличие товара по городам:' });
  content.appendChild(title);

  const list = createElement('ul', 'tooltip__list');
  for (const [key, count] of Object.entries(availability)) {
    const cityName = cityNames[key] || key;
    const li = createElement('li', 'tooltip__item');
    const text = createElement('span', 'tooltip__text', { text: `${cityName}: ` });
    const countSpan = createElement('span', 'tooltip__count', { text: count });
    text.appendChild(countSpan);
    li.appendChild(text);
    list.appendChild(li);
  }
  content.appendChild(list);
  tooltip.appendChild(content);

  return tooltip;
}

// Информационный блок
function createInfoBlock(product) {
  const div = createElement('div', 'product-card__info');

  const title = createElement('h2', 'product-card__title', { text: product.name });
  div.appendChild(title);

  // Старая цена отображается только если она есть и больше новой
  if (product.price.old && product.price.old > product.price.new) {
    div.appendChild(createOldPrice(product.price.old));
  }

  div.appendChild(createPrice(product.price.new));
  div.appendChild(createTooltip(product.availability));

  return div;
}

// Полная карточка товара
function createProductCard(product) {
  const card = createElement('div', 'product-card');
  card.append(
    createVisualBlock(product),
    createInfoBlock(product)
  );
  return card;
}

function createCatalogItem(product) {
  const li = createElement('li', 'catalog__item');
  li.appendChild(createProductCard(product));
  return li;
}

export {createCatalogItem}