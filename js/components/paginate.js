import storage from "../storage.js";
import { createElement } from "./components.js";

export default function renderPaginate(){
 const paginateList = document.querySelector(".catalog__pagination")   
 const totalPage =  storage.getTotalPages()
 paginateList.innerHTML = ''

 for(let num = 1; num<=totalPage; num++)
    {
    const li =  createElement('li', 'catalog__pagination')
    const button = createElement('button', 'catalog__pagination-link')
    button.textContent = num
    li.append(button)
    paginateList.append(li)
    }

}