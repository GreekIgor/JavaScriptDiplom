import App from "./app.js"

window.addEventListener('DOMContentLoaded', () => {

  const catalog = document.querySelector(".catalog__list")
  const application = new App(catalog)
  application.init();


});
