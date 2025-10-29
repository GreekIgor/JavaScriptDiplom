// Вспомогательная функция для создания элемента
function createElement(tag, className = '', attributes = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'text') {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  });
  return el;
}


function createIcon(id, width = 24, height = 24, className = '') {
  const svg = createElement('svg', className, { width, height, 'aria-hidden': 'true' });
  const use = createElement('use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `images/sprite.svg#${id}`);
  svg.appendChild(use);
  return svg;
}

function createImage(src, classElem, height, width) {
  return createElement('img', classElem, {
    src,
    width,
    height,
    alt: 'Изображение товара'
  });
}

export {createElement, createIcon, createImage}