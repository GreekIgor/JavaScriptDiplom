   import renderPaginate from "./components/paginate.js";
   import storage from "./storage.js"
   import { createCatalogItem,createDayProductItem } from "./components/card.js"
   import { initSwipper } from "./components/slider.js";

   function renderPage(page = 1)
   {
    renderPaginate()
    const data = storage.getPage(page)
    renderCatalog(data)
   }

   function renderDayProduct()
   {
    const catalogGoodsOfDay = document.querySelector(".day-products__list");
    catalogGoodsOfDay.innerHTML = ''
    const data = storage.getStorage()
    const goodsOfDay = data.filter(item=>{
      return item.goodsOfDay
    })
    goodsOfDay.forEach(item=>{
      catalogGoodsOfDay.append(createCatalogItem(item))
    })
    
    initSwipper()
   }

    async function renderCatalog(data)
    {
      const catalog = document.querySelector(".catalog__list")
      catalog.innerHTML = ''

     data.forEach((item) => {
       catalog.append(createCatalogItem(item)) 
    });
    }

    export {renderCatalog, renderPage, renderDayProduct}