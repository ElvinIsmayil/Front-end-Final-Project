import { 
  getCurrentWishlist, 
  removeFromWishlist, 
  moveToCart,
  clearWishlist,
  updateWishlistUI,
  subscribeToWishlistChanges,
  isWishlistEmpty
} from "../store/wishlist.js";

import { addToCart } from "../store/cart.js";


function createWishlistItemButtons(productId) {
  
  const addToCartBtn = document.createElement('button');
  addToCartBtn.type = 'button';
  addToCartBtn.className = 'btn btn-sm btn-outline-dark add-to-cart-btn';
  addToCartBtn.setAttribute('data-product-id', productId);
  addToCartBtn.innerHTML = '<i class="fa-light fa-cart-shopping me-1"></i> Add to Cart';
  addToCartBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add to cart button clicked for product ID:', productId);
    moveToCart(productId, addToCart);
  };
  
  
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm text-danger remove-wishlist-item-btn';
  removeBtn.setAttribute('data-product-id', productId);
  removeBtn.innerHTML = '<i class="fa-light fa-trash-can"></i>';
  removeBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Remove button clicked for product ID:', productId);
    removeFromWishlist(productId);
  };
  
  return { addToCartBtn, removeBtn };
}


function updateWishlistPage() {
  const wishlist = getCurrentWishlist();
  const wishlistItemsContainer = document.getElementById('wishlist-items');
  const emptyWishlistEl = document.getElementById('empty-wishlist');
  const wishlistContentEl = document.getElementById('wishlist-content');
  
  if (!wishlistItemsContainer) {
    console.warn('Wishlist items container not found');
    return;
  }

  console.log('Updating wishlist page, items:', wishlist.length, wishlist);
  
  
  wishlistItemsContainer.innerHTML = '';

  
  if (wishlist.length === 0) {
    if (emptyWishlistEl) emptyWishlistEl.style.display = 'block';
    if (wishlistContentEl) wishlistContentEl.style.display = 'none';
    return;
  } else {
    if (emptyWishlistEl) emptyWishlistEl.style.display = 'none';
    if (wishlistContentEl) wishlistContentEl.style.display = 'block';
  }
  
  
  wishlist.forEach(item => {
    console.log('Rendering wishlist item:', item);
    
    
    const productId = item.id || '0';
    const productName = item.name || 'Unknown Product';
    const productPrice = parseFloat(item.price) || 0;
    const productImage = item.image || '';
    
    
    const tr = document.createElement('tr');
    tr.setAttribute('data-product-id', productId);
    
    
    const productCell = document.createElement('td');
    productCell.className = 'ps-0';
    
    const productDiv = document.createElement('div');
    productDiv.className = 'd-flex align-items-center';
    
    const productImg = document.createElement('img');
    productImg.src = productImage;
    productImg.alt = productName;
    productImg.className = 'img-fluid me-3';
    productImg.style.width = '80px';
    productImg.style.height = '80px';
    productImg.style.objectFit = 'cover';
    
    const productNameEl = document.createElement('h6');
    productNameEl.className = 'mb-0';
    productNameEl.textContent = productName;
    
    productDiv.appendChild(productImg);
    productDiv.appendChild(productNameEl);
    productCell.appendChild(productDiv);
    
    
    const priceCell = document.createElement('td');
    priceCell.className = 'text-center';
    priceCell.textContent = `$${productPrice.toFixed(2)}`;
    
    
    const actionCell = document.createElement('td');
    actionCell.className = 'text-end pe-0';
    
    
    const { addToCartBtn, removeBtn } = createWishlistItemButtons(productId);
    
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'btn-group';
    buttonGroup.appendChild(addToCartBtn);
    buttonGroup.appendChild(removeBtn);
    
    actionCell.appendChild(buttonGroup);
    
    
    tr.appendChild(productCell);
    tr.appendChild(priceCell);
    tr.appendChild(actionCell);
    
    
    wishlistItemsContainer.appendChild(tr);
  });
}


export function initializeWishlistPage() {
  console.log('Initializing wishlist page');
  
  
  const clearWishlistBtn = document.getElementById('clear-wishlist');
  if (clearWishlistBtn) {
    clearWishlistBtn.onclick = function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to clear your wishlist?')) {
        clearWishlist();
      }
    };
  }
  
  
  updateWishlistPage();
  
  
  subscribeToWishlistChanges(() => {
    updateWishlistPage();
  });
  
  
  window.addEventListener('wishlist:updated', () => {
    console.log('Wishlist update event received in wishlist page');
    updateWishlistPage();
  });
}

export function initializeWishlistPages() {
  const path = window.location.pathname;
  
  
  updateWishlistUI();
  
  if (path.includes('wishlist.html')) {
    initializeWishlistPage();
  }
} 