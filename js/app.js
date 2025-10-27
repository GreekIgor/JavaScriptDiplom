import { createCatalogItem } from "./components/card.js"
import storage from "./storage.js"

export default class App{
    

    static TYPE = ["pendant", "nightlights", "overhead", "point","ceiling"];

    constructor (catalog){
      this.catalog = catalog 
      this.filters = {} 
    }


   async init(){
        this.initElement()
        const data = await this.getData()
        storage.setStorage(data)
        this.renderCatalog(storage.getStorage())
        this.getAmmountType()
        this.initEventsFilter()
    }


    getAmmountType()
    {

     App.TYPE.forEach(type=>{
      const countType = storage.setFilter({type}).applyFilters().length
       this.setShowAmmountType(type, countType)
       storage.clearFilters()
     })
      
      this.setShowAmmountType()
    }

    setShowAmmountType(amount_type, value)
    {
       const lblTypeCount = document.querySelector(`.custom-checkbox--${amount_type} .custom-checkbox__count`)
       if(value !== undefined)
       lblTypeCount.textContent = value
    }


    initEventsFilter()
    {

        const formFilter = document.querySelector(".catalog-form")
        const allCheckboxes = formFilter.querySelectorAll("input[type=checkbox]")


        formFilter.addEventListener("submit", (e)=>{
            e.preventDefault()
             const formData = new FormData(formFilter);

            if (formData.has('goodsOfDay')) this.filters.goodsOfDay = true;
            if (formData.has('inStockMoscow')) this.filters.inStockMoscow = true;
            if (formData.has('inStockOrenburg')) this.filters.inStockOrenburg = true;
            if (formData.has('inStockSaintPetersburg')) this.filters.inStockSaintPetersburg = true;
            const types = formData.getAll('type'); 
            console.log(types)
            types.forEach(type=>{
                 storage.setFilter({type})
            })
            storage.setFilter(this.filters)
            const res = storage.applyFilters()
           console.log('result',res)
           this.renderCatalog(res)
           console.log("filters", storage.getActiveFilters())

        })

        formFilter.addEventListener("reset", (e)=>{
          storage.clearFilters()
          const res = storage.getFilteredData()
          this.renderCatalog(res)
        })


        allCheckboxes.forEach(checkbox=>{
            checkbox.addEventListener("change", (e)=>{
                e.preventDefault()
                formFilter.requestSubmit()
            })
        })

    }


    initElement(){
   const menuButton = document.querySelector(".header__catalog-btn");
   const locationCityName = document.querySelector(".location__city-name");
   const mainMenu = document.querySelector(".main-menu");
   menuButton.addEventListener('click', ()=>{
    console.log("нажали кнопку")
        
        mainMenu.classList.toggle("main-menu--active")
   })

   const menuButtonClose = document.querySelector(".main-menu__close")
   menuButtonClose.addEventListener("click", ()=>{
        mainMenu.classList.remove("main-menu--active")
   })

   const locationButton = document.querySelector(".location__city")
   locationButton.addEventListener("click", ()=>{
    locationButton.classList.toggle("location__city--active")
   })

   const locationSublink = document.querySelectorAll(".location__sublink")
   locationSublink.forEach((item)=> item.addEventListener("click", ()=>{
    const cityName = item.textContent
    console.log(cityName)
        locationCityName.textContent = cityName
        locationButton.classList.remove("location__city--active")
   }))
    }

    async getData()
    {
    const response = await fetch("data/data.json")
    return await response.json();
    }

    async renderCatalog(data)
    {
      this.catalog.innerHTML = ''

     data.forEach((item) => {
       this.catalog.append(createCatalogItem(item)) 
    });
    }


}