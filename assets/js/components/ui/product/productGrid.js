import { productCardTemplate } from "./card.js";

function createProductGrid(products, container, limit = null) {
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";
  
  const productsToShow = limit ? products.slice(0, limit) : products;
  
  productsToShow.forEach((product) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-md-4 col-lg-3';
    colDiv.innerHTML = productCardTemplate(product);
    fragment.appendChild(colDiv);
  });
  
  container.appendChild(fragment);
}

export function drawFeaturedCards(products, container) {
  createProductGrid(products, container, 8); 
}

export function drawNewArrivalCards(products, container) {
  createProductGrid(products, container, 4); 
}

export function drawAllProducts(products, container) {
  createProductGrid(products, container); 
}