import { 
  getCurrentCart, 
  removeFromCart, 
  updateCartItemQuantity, 
  getCartTotal,
  subscribeToCartChanges
} from "../../../store/cart.js";

/**
 * Render a single cart item as HTML
 * @param {Object} item - Cart item
 * @returns {string} HTML for the cart item
 */
function renderCartItem(item) {
  return `
    <div class="cart-item d-flex align-items-center p-3 border-bottom" data-product-id="${item.id}">
      <div class="item-image me-3">
        <img src="${item.image}" alt="${item.name}" class="img-fluid" style="width: 60px; height: 60px; object-fit: cover;">
      </div>
      <div class="item-details flex-grow-1">
        <h6 class="mb-1">${item.name}</h6>
        <div class="d-flex justify-content-between align-items-center">
          <div class="item-quantity d-flex align-items-center">
            <button type="button" class="btn btn-sm btn-outline-secondary quantity-btn-decrease" data-product-id="${item.id}">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary quantity-btn-increase" data-product-id="${item.id}">+</button>
          </div>
          <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
      <button type="button" class="btn btn-sm text-danger remove-item-btn" data-product-id="${item.id}">
        <i class="fa-light fa-trash-can"></i>
      </button>
    </div>
  `;
}

/**
 * Render an empty cart message
 * @returns {string} HTML for the empty cart
 */
function renderEmptyCart() {
  return `
    <div class="text-center p-4">
      <div class="mb-3">
        <i class="fa-light fa-shopping-bag fa-3x text-muted"></i>
      </div>
      <h5>Your cart is empty</h5>
      <p class="text-muted">Looks like you haven't added any products to your cart yet.</p>
      <button class="btn btn-dark mt-2" data-bs-dismiss="offcanvas">Continue Shopping</button>
    </div>
  `;
}

/**
 * Create cart item buttons with event handlers
 * @param {number} productId - Product ID
 * @returns {Object} Button elements
 */
function createCartItemButtons(productId) {
  // Create increase quantity button
  const increaseBtn = document.createElement('button');
  increaseBtn.type = 'button';
  increaseBtn.className = 'btn btn-sm btn-outline-secondary quantity-btn-increase';
  increaseBtn.setAttribute('data-product-id', productId);
  increaseBtn.textContent = '+';
  increaseBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = getCurrentCart().find(item => item.id === productId);
    if (cartItem) {
      updateCartItemQuantity(productId, cartItem.quantity + 1);
    }
  };
  
  // Create decrease quantity button
  const decreaseBtn = document.createElement('button');
  decreaseBtn.type = 'button';
  decreaseBtn.className = 'btn btn-sm btn-outline-secondary quantity-btn-decrease';
  decreaseBtn.setAttribute('data-product-id', productId);
  decreaseBtn.textContent = '-';
  decreaseBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = getCurrentCart().find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      updateCartItemQuantity(productId, cartItem.quantity - 1);
    }
  };
  
  // Create remove button
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm text-danger remove-item-btn';
  removeBtn.setAttribute('data-product-id', productId);
  removeBtn.innerHTML = '<i class="fa-light fa-trash-can"></i>';
  removeBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(productId);
  };
  
  return { increaseBtn, decreaseBtn, removeBtn };
}

/**
 * Update the cart sidebar with current cart contents
 */
export function updateCartSidebar() {
  const cartContainer = document.querySelector('.cart-items-container');
  const subtotalElement = document.querySelector('.cart-summary h5:last-of-type');
  const cart = getCurrentCart();
  
  if (!cartContainer) {
    console.warn('Cart container not found');
    return;
  }
  
  // Clear current contents
  cartContainer.innerHTML = '';
  
  if (cart.length === 0) {
    // Show empty cart message
    const emptyCartDiv = document.createElement('div');
    emptyCartDiv.className = 'text-center p-4';
    emptyCartDiv.innerHTML = renderEmptyCart();
    cartContainer.appendChild(emptyCartDiv);
    
    if (subtotalElement) {
      subtotalElement.textContent = '$0.00 USD';
    }
    
    // Disable cart and checkout buttons
    const viewCartBtn = document.querySelector('.cart-summary a[href="./cart.html"]');
    const checkoutBtn = document.querySelector('.cart-summary a[href="./checkout.html"]');
    
    if (viewCartBtn) viewCartBtn.classList.add('disabled');
    if (checkoutBtn) checkoutBtn.classList.add('disabled');
    
    return;
  }
  
  // Enable cart and checkout buttons
  const viewCartBtn = document.querySelector('.cart-summary a[href="./cart.html"]');
  const checkoutBtn = document.querySelector('.cart-summary a[href="./checkout.html"]');
  
  if (viewCartBtn) viewCartBtn.classList.remove('disabled');
  if (checkoutBtn) checkoutBtn.classList.remove('disabled');
  
  // Add each cart item to the sidebar
  cart.forEach(item => {
    // Create cart item element
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item d-flex align-items-center p-3 border-bottom';
    itemDiv.setAttribute('data-product-id', item.id);
    
    // Create image container
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
    
    // Create item details container
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'item-details flex-grow-1';
    
    const title = document.createElement('h6');
    title.className = 'mb-1';
    title.textContent = item.name;
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'd-flex justify-content-between align-items-center';
    
    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'item-quantity d-flex align-items-center';
    
    // Create buttons with event handlers
    const { decreaseBtn, increaseBtn, removeBtn } = createCartItemButtons(item.id);
    
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'mx-2';
    quantitySpan.textContent = item.quantity;
    
    quantityDiv.appendChild(decreaseBtn);
    quantityDiv.appendChild(quantitySpan);
    quantityDiv.appendChild(increaseBtn);
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'item-price';
    priceDiv.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    
    controlsDiv.appendChild(quantityDiv);
    controlsDiv.appendChild(priceDiv);
    
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(controlsDiv);
    
    // Assemble cart item
    itemDiv.appendChild(imageDiv);
    itemDiv.appendChild(detailsDiv);
    itemDiv.appendChild(removeBtn);
    
    // Add to container
    cartContainer.appendChild(itemDiv);
  });
  
  // Update subtotal
  if (subtotalElement) {
    subtotalElement.textContent = `$${getCartTotal().toFixed(2)} USD`;
  }
}

/**
 * Initialize cart sidebar and set up event handlers
 */
export function initCartSidebar() {
  // Update the cart sidebar initially
  updateCartSidebar();
  
  // Subscribe to cart changes
  subscribeToCartChanges(() => {
    updateCartSidebar();
  });
  
  // Update sidebar when the offcanvas is shown
  const cartOffcanvas = document.getElementById('cartOffcanvas');
  if (cartOffcanvas) {
    cartOffcanvas.addEventListener('show.bs.offcanvas', function() {
      updateCartSidebar();
    });
    
    // Disable links in cart summary if they have the 'disabled' class
    const cartSummary = cartOffcanvas.querySelector('.cart-summary');
    if (cartSummary) {
      const links = cartSummary.querySelectorAll('a');
      links.forEach(link => {
        link.onclick = function(e) {
          if (this.classList.contains('disabled')) {
            e.preventDefault();
            return false;
          }
        };
      });
    }
  }
  
  // Update sidebar when cart:updated event is received
  window.addEventListener('cart:updated', () => {
    updateCartSidebar();
  });
} 