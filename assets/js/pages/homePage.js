import { getAllData } from "../services/productService.js";
import { endpoints } from "../utils/constants.js";
import { drawFeaturedCards, drawNewArrivalCards } from "../components/ui/product/productGrid.js";

export function initializeHomePage() {
  const featuredWrapper = document.getElementById("featured-cards-wrapper");
  const newArrivalsWrapper = document.getElementById("new-arrivals-wrapper");
  
  if (featuredWrapper || newArrivalsWrapper) {
    getAllData(endpoints.products)
      .then(products => {
        if (!products || !Array.isArray(products)) {
          console.error("Error: products is not an array or is undefined");
          return;
        }
        
        if (featuredWrapper) drawFeaturedCards(products, featuredWrapper);
        if (newArrivalsWrapper) drawNewArrivalCards(products, newArrivalsWrapper);
      })
      .catch(error => {
        console.error("Error fetching products for home page:", error);
      });
  }
}