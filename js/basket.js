import { createElement ,createIcon, createImage} from "./components/components.js"
class Basket{

    constructor (){
        this.basket = []
    }

    addProduct(product)
    {
     this.basket.push(product)
     this.renderBasket()
    }

    getProducts()
    {
        return this.basket
    }

    removeProduct(id)
    {
        this.basket = this.basket.filter(item => item.id !== id);
        this.renderBasket()
    }


    renderBasket()
    {
      const basketEmpty =  document.querySelector('.basket__empty-block')
      const basketCount = document.querySelector('.header__user-count')

      basketEmpty.style.display = this.basket.length === 0 ? 'block' : 'none';
      basketCount.textContent = this.basket.length

      const basketList = document.querySelector('.basket__list');
      basketList.innerHTML = ''

    this.basket.forEach(item=>{
     const li =  createElement('li', 'basket__item')
    const divImg = createElement('div', 'basket__img')
    const img = createElement('img', '', {height:60, width: 60, alt: 'Фотография товара', src: item.image})
    divImg.append(img)
    const spanName = createElement('span', 'basket__name')
    spanName.textContent = item.name
    const spanPrice = createElement('span', 'basket__price')
    spanPrice.textContent = `${item.price.new} руб`
    const btnClose = createElement('button', 'basket__item-close', {type:'button'})
    const icon = createIcon('icon-close',24,24, 'main-menu__close')

    btnClose.addEventListener('click', (e)=>{
        basket.removeProduct(item.id)
    })    
    
    btnClose.append(icon)
    li.append(divImg, spanName, spanPrice , btnClose)
    basketList.append(li)
    })

   
    }
}

const basket = new Basket()
export default basket;