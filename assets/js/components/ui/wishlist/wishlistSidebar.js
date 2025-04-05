import { 
  getCurrentWishlist, 
  removeFromWishlist, 
  moveToCart,
  subscribeToWishlistChanges
} from "../../../store/wishlist.js";

import { addToCart } from "../../../store/cart.js";

/**
 * Renders an empty wishlist message
 * @returns {string} HTML for the empty wishlist
 */
function renderEmptyWishlist() {
  return `
    <div class="text-center p-4">
      <div class="mb-3">
        <i class="fa-light fa-heart fa-3x text-muted"></i>
      </div>
      <h5>Your wishlist is empty</h5>
      <p class="text-muted">Add items you love to your wishlist. Review them anytime and move them to your cart.</p>
      <button class="btn btn-dark mt-2" data-bs-dismiss="offcanvas">Continue Shopping</button>
    </div>
  `;
}

/**
 * Creates wishlist item buttons with proper event handlers 
 * @param {number} productId - Product ID
 * @returns {Object} Object containing button elements
 */
function createWishlistItemButtons(productId) {
  // Create move to cart button
  const moveToCartBtn = document.createElement('button');
  moveToCartBtn.type = 'button';
  moveToCartBtn.className = 'btn btn-sm btn-outline-dark move-to-cart-btn';
  moveToCartBtn.setAttribute('data-product-id', productId);
  moveToCartBtn.innerHTML = '<i class="fa-light fa-cart-shopping me-1"></i> Add to Cart';
  moveToCartBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    moveToCart(productId, addToCart);
  };
  
  // Create remove button
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm text-danger remove-wishlist-item-btn';
  removeBtn.setAttribute('data-product-id', productId);
  removeBtn.innerHTML = '<i class="fa-light fa-trash-can"></i>';
  removeBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(productId);
  };
  
  return { moveToCartBtn, removeBtn };
}

/**
 * Updates the wishlist sidebar UI with direct DOM manipulation
 */
export function updateWishlistSidebar() {
  const wishlistContainer = document.querySelector('.wishlist-items-container');
  const wishlist = getCurrentWishlist();
  
  if (!wishlistContainer) {
    console.warn('Wishlist container not found');
    return;
  }
  
  wishlistContainer.innerHTML = '';
  
  if (wishlist.length === 0) {
    const emptyWishlistDiv = document.createElement('div');
    emptyWishlistDiv.className = 'text-center p-4';
    emptyWishlistDiv.innerHTML = renderEmptyWishlist();
    wishlistContainer.appendChild(emptyWishlistDiv);
    return;
  }
  
  wishlist.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'wishlist-item d-flex align-items-center p-3 border-bottom';
    itemDiv.setAttribute('data-product-id', item.id);
    
    const imageDiv = document.createElement('div');
    imageDiv.className = 'item-image me-3';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.className = 'img-fluid';
    img.style.width = '60px';
    img.style.height = '60px';
    img.style.objectFit = 'cover';
    
    imageDiv.appendChild(img);
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'item-details flex-grow-1';
    
    const title = document.createElement('h6');
    title.className = 'mb-1';
    title.textContent = item.name;
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'item-price mb-2';
    priceDiv.textContent = `$${item.price.toFixed(2)}`;
    
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(priceDiv);
    
    const { moveToCartBtn, removeBtn } = createWishlistItemButtons(item.id);
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'd-flex flex-column align-items-end';
    buttonsDiv.appendChild(moveToCartBtn);
    
    const spacer = document.createElement('div');
    spacer.className = 'my-1';
    buttonsDiv.appendChild(spacer);
    
    buttonsDiv.appendChild(removeBtn);
    
    itemDiv.appendChild(imageDiv);
    itemDiv.appendChild(detailsDiv);
    itemDiv.appendChild(buttonsDiv);
    
    wishlistContainer.appendChild(itemDiv);
  });
}

/**
 * Initialize wishlist sidebar functionality
 */
export function initWishlistSidebar() {
  // Initial UI update
  updateWishlistSidebar();
  
  // Subscribe to wishlist changes
  subscribeToWishlistChanges(() => {
    updateWishlistSidebar();
  });
  
  // Update sidebar when offcanvas is shown
  const wishlistOffcanvas = document.getElementById('wishlistOffcanvas');
  if (wishlistOffcanvas) {
    wishlistOffcanvas.addEventListener('show.bs.offcanvas', function() {
      updateWishlistSidebar();
    });
  }
  
  // Listen for custom wishlist update events
  window.addEventListener('wishlist:updated', () => {
    updateWishlistSidebar();
  });
} 