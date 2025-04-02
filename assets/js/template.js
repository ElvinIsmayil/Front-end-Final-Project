import { convertRatingToStars } from "./helper.js";

function productCardTemplate(product){
    const hasHoverImage =
      product.hoverImage && product.hoverImage.trim() !== "";
    const starRating = convertRatingToStars(product.rating);
    
    return `
    <div class="card product-card border-0 h-100">
        <div class="card-img-container position-relative">
          <img src="${product.image}" class="card-img-top primary-img" alt="${product.name}">
          ${
            hasHoverImage
              ? `<img src="${product.hoverImage}" class="card-img-top hover-img" alt="${product.name} hover">`
              : ""
          }
          <!-- Quick action buttons -->
          <div class="product-actions">
            <button class="btn action-btn" onclick="quickView(${product.id})" aria-label="Quick view">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn action-btn" onclick="addToWishlist(${product.id})" aria-label="Add to wishlist">
              <i class="fas fa-heart"></i>
            </button>
          </div>
        </div>
        
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title product-title">${product.name}</h5>
          <span class="text-muted mb-2">m. ${product.price}</span>
          <div class="rating mb-3">
            ${starRating}
          </div>
          <button class="btn btn-dark mt-auto add-to-cart-btn" onclick="addToCart(${product.id}, 1)">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    
}

export{
    productCardTemplate
}