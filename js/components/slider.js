import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

function initSwipper()
{
 const swiper = new Swiper('.swiper',{
    spaceBetween: 20,
    slidesPerView: 4,
    navigation: {
        nextEl: '.day-products__navigation-btn--next',
        prevEl: '.day-products__navigation-btn--prev'
    }
 })
}

export {initSwipper}