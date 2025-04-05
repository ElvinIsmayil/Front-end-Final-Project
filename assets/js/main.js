import { playVideo } from "./components/ui/video.js";
import "./components/ui/swipers/index.js";
import { initializeHomePage } from "./pages/homePage.js";
import { initializeProductsPage } from "./pages/productsPage.js";
import { initializeProductShowcase } from "./components/ui/product/productShowcase.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  initializeProductShowcase();

  if (path === "/" || path.includes("index")) {
    initializeHomePage();
  } else if (path.includes("all-products")) {
    initializeProductsPage();
  }
});


