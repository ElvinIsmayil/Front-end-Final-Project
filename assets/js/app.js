import { getAllData, getDataById } from "./services.js";
import {endpoints } from "./constants.js";
import { productCardTemplate } from "./template.js";

document.addEventListener("DOMContentLoaded", function () {
  initializeProducts();
});

async function initializeProducts() {
  try {
    const wrappers = {
      featured: document.getElementById("featured-cards-wrapper"),
      newArrivals: document.getElementById("new-arrivals-wrapper"),
      all: document.getElementById("all-cards-wrapper")
    };
    
    if (wrappers.featured || wrappers.newArrivals || wrappers.all) {
      const products = await getAllData(endpoints.products);
      
      if (!products || !Array.isArray(products)) {
        console.error("Error: products is not an array or is undefined");
        return;
      }
      if (wrappers.featured) drawFeaturedCards(products,wrappers.featured);
      if (wrappers.newArrivals) drawNewArrivalCards(products, wrappers.newArrivals);
      if (wrappers.all) drawAllCards(products, wrappers.all);
    }
  } catch (error) {
    console.error("Error initializing products:", error);
  }
}

function drawFeaturedCards(products,featuredCardsWrapper) {

  const fragment = document.createDocumentFragment();

  featuredCardsWrapper.innerHTML = "";

  const productsToShow = products.slice(0, 8);


  productsToShow.forEach((product) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-md-4 col-lg-3';
    colDiv.innerHTML = productCardTemplate(product);
    fragment.appendChild(colDiv)
  });
  featuredCardsWrapper.appendChild(fragment)
}

function drawNewArrivalCards(products, newArrivalCardsWrapper) {

  const fragment = document.createDocumentFragment();

  newArrivalCardsWrapper.innerHTML = "";

  const productsToShow = products.slice(0, 4);


  productsToShow.forEach((product) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-md-4 col-lg-3';
    colDiv.innerHTML = productCardTemplate(product);
    fragment.appendChild(colDiv)
  });
  newArrivalCardsWrapper.appendChild(fragment)
}

function drawAllCards(products,allCardsWrapper) {

  const fragment = document.createDocumentFragment();

  allCardsWrapper.innerHTML = "";

  products.forEach((product) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-md-4 col-lg-3';
    colDiv.innerHTML = productCardTemplate(product);
    fragment.appendChild(colDiv)
  });
  allCardsWrapper.appendChild(fragment)
}

// function addToCart(productId) {
//   console.log("Added product to cart:", productId);
// }

// async function quickView(productId) {
//   console.log("Added product to cart:", productId);
// }

// function addToWishlist(productId) {
//   console.log("Added product to wishlist:", productId);
//   const favoriteCount = document.querySelector(".favorite-count");
// }
