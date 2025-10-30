   import renderPaginate from "./components/paginate.js";
   import storage from "./storage.js"
   import { createCatalogItem } from "./components/card.js"

   function renderPage(page = 1)
   {
    renderPaginate()
    const data = storage.getPage(page)
    renderCatalog(data)
   }

    async function renderCatalog(data)
    {
      const catalog = document.querySelector(".catalog__list")
      catalog.innerHTML = ''

     data.forEach((item) => {
       catalog.append(createCatalogItem(item)) 
    });
    }

    export {renderCatalog, renderPage}