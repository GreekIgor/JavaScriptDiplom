
import { renderPage, renderDayProduct } from "./render.js";
import storage from "./storage.js"

export default class App{
    

    static TYPE = ["pendant", "nightlights", "overhead", "point","ceiling"];

    constructor (){
      this.filters = {} 
    }


   async init(){
        this.initElement()
        const data = await this.getData()
        storage.setStorage(data)
        renderPage()
        renderDayProduct()
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
        const allCheckboxesAndRadio = formFilter.querySelectorAll("input[type]")
        const sortFilter = document.querySelector('.catalog__sort-select')


        formFilter.addEventListener("submit", (e)=>{
            e.preventDefault()
             const formData = new FormData(formFilter);

            
            storage.setFilter({status:formData.get('status')}) 

            if (formData.has('goodsOfDay')) this.filters.goodsOfDay = true;
            if (formData.has('inStockMoscow')) this.filters.inStockMoscow = true;
            if (formData.has('inStockOrenburg')) this.filters.inStockOrenburg = true;
            if (formData.has('inStockSaintPetersburg')) this.filters.inStockSaintPetersburg = true;
            const types = formData.getAll('type'); 
            types.forEach(type=>{
                 storage.setFilter({type})
            })
            storage.setFilter(this.filters)
            storage.applyFilters()
            renderPage()
            console.log("filters", storage.getActiveFilters())

        })

        formFilter.addEventListener("reset", (e)=>{
          storage.clearFilters()
          renderPage()
        })


        allCheckboxesAndRadio.forEach(checkbox=>{
            checkbox.addEventListener("change", (e)=>{
                e.preventDefault()
                formFilter.requestSubmit()
            })
        })

        sortFilter.addEventListener('change', ()=>{
            storage.setSort(sortFilter.value)
        })


    }


    initElement(){
   const menuButton = document.querySelector(".header__catalog-btn");
   const locationCityName = document.querySelector(".location__city-name");
   const mainMenu = document.querySelector(".main-menu");
   const basketBtn = document.querySelector(".header__user-btn");
   const basket = document.querySelector(".basket");

  const accordionBtn = document.querySelectorAll('.accordion__btn')
  
  accordionBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
    const isActive = btn.classList.contains('accordion__btn--active')  
    accordionBtn.forEach(btn=>btn.classList.remove('accordion__btn--active')) 
    if(!isActive) 
    btn.classList.add('accordion__btn--active')
  })
  })

   menuButton.addEventListener('click', ()=>{
    console.log("нажали кнопку")
        
        mainMenu.classList.toggle("main-menu--active")
   })

   basketBtn.addEventListener("click", ()=>{
      basket.classList.toggle("basket--active")
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





}