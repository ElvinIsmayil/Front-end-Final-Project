import { getAllData } from "../services/productService.js";
import { endpoints } from "../utils/constants.js";
import { drawAllProducts } from "../components/ui/product/productGrid.js";

export function initializeProductsPage() {
  const allProductsWrapper = document.getElementById("all-cards-wrapper");
  
  if (allProductsWrapper) {
    getAllData(endpoints.products)
      .then(products => {
        if (!products || !Array.isArray(products)) {
          console.error("Error: products is not an array or is undefined");
          return;
        }
        
        drawAllProducts(products, allProductsWrapper);
      })
      .catch(error => {
        console.error("Error fetching products for all products page:", error);
      });
  }
}