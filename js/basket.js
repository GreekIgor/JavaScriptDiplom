import { createElement ,createIcon, createImage} from "./components/components.js"
class Basket{

    constructor (){
        this.basket = []
        this.basketList = document.querySelector('.basket__list');
        this.basketEmpty =  document.querySelector('.basket__empty-block')
        this.basketCount = document.querySelector('.header__user-count')
    }

    calculateCountInbasket()
    {
      this.basketEmpty.style.display = this.basket.length === 0 ? 'block' : 'none';
      this.basketCount.textContent = this.basket.length
    }

    addProduct(product)
    {
     this.basket.push(product)
     const li = this.createItemBasket(product)
    this.basketList.append(li)
    this.calculateCountInbasket()
    }

    getProducts()
    {
        return this.basket
    }

    removeProduct(id)
    {
        this.basket = this.basket.filter(item => item.id !== id);
        const item = document.querySelector(`li[data-id="${id}"]`)
        item.remove()
        this.calculateCountInbasket()
    }

    createItemBasket(item)
    {

    const li =  createElement('li', 'basket__item', {"data-id": item.id})
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
    return li
    }

    renderBasket()
    {
      

      this.basketEmpty.style.display = this.basket.length === 0 ? 'block' : 'none';
      this.basketCount.textContent = this.basket.length
      this.basketList.innerHTML = ''

    this.basket.forEach(item=>{
    const li = this.createItemBasket(item)
    basketList.append(li)
    })

    this.calculateCountInbasket()

   
    }
}

const basket = new Basket()
export default basket;