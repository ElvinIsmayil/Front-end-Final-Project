import { convertRatingToStars } from "../../../utils/helper.js";
import { isInWishlist } from "../../../store/wishlist.js";

function productCardTemplate(product) {
  const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== "";
  const starRating = convertRatingToStars(product.rating);
  
  
  const productId = product.id || Date.now();
  
  
  const isWishlisted = isInWishlist(String(productId));
  const heartIcon = isWishlisted ? 'fa-solid fa-heart text-dark' : 'fa-light fa-heart';
  const wishlistTitle = isWishlisted ? 'Remove from wishlist' : 'Add to wishlist';
  
  
  const safeProduct = {
    ...product,
    id: productId
  };
  
  
  let productDataAttr = '';
  try {
    productDataAttr = JSON.stringify(safeProduct);
  } catch (err) {
    console.error('Error stringifying product data:', err);
    productDataAttr = JSON.stringify({ id: productId, name: product.name || 'Product' });
  }
  
  return `
  <div class="card product-card border-0">
    <div class="card-img-container position-relative bg-light overflow-hidden">
      <img src="${product.image}" class="card-img-top" alt="${product.name}">
      ${
        hasHoverImage
          ? `<img src="${product.hoverImage}" class="card-img-top hover-img position-absolute top-0 start-0 w-100 h-100 opacity-0" 
              style="transition: opacity 0.3s ease;"
              onmouseover="this.classList.remove('opacity-0')"
              onmouseout="this.classList.add('opacity-0')"
              alt="${product.name} hover">`
          : ""
      }
      ${product.discount ? 
        `<span class="position-absolute top-0 end-0 badge bg-danger m-2">SALE</span>` : ''}
      
      <div class="product-actions position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2 opacity-0" 
           style="transition: opacity 0.3s ease;">
        <button class="btn action-btn btn-sm btn-light rounded-circle" data-action="quick-view" data-product-id="${productId}" data-product-data='${productDataAttr}' aria-label="Quick view">
          <i class="fa-light fa-eye"></i>
        </button>
        <button class="btn action-btn btn-sm btn-light rounded-circle" data-action="add-to-cart" data-product-id="${productId}" data-product-data='${productDataAttr}' aria-label="Add to cart">
          <i class="fa-regular fa-plus-large"></i>
        </button>
        <button class="btn action-btn btn-sm btn-light rounded-circle" data-action="add-to-wishlist" data-product-id="${productId}" data-product-data='${productDataAttr}' title="${wishlistTitle}" aria-label="${wishlistTitle}">
          <i class="${heartIcon}"></i>
        </button>
      </div>
    </div>
    
    <div class="card-body text-center p-0 mt-3">
      ${product.rating ? 
        `<div class="rating mb-2">
          ${starRating}
        </div>` : ''}
      <h5 class="card-title product-title mb-1 fs-6">${product.name}</h5>
      <div class="price mb-2">
        <span class="fw-normal text-muted">
          ${typeof product.price === 'number' ? 
            `$${product.price.toFixed(2)}` : `$${product.price}`}
        </span>
        ${product.oldPrice ? 
          `<span class="text-decoration-line-through text-muted ms-2">$${product.oldPrice}</span>` : ''}
      </div>
    </div>
  </div>
  <style>
  .card-img-container:hover .product-actions {
    opacity: 1 !important;
  }
  </style>
  `;
}

export {
  productCardTemplate
} 