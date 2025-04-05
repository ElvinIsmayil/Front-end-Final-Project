import { 
  getCurrentCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart, 
  getCartTotal, 
  updateCartUI,
  subscribeToCartChanges,
  isCartEmpty
} from "../store/cart.js";


function renderCartItem(item) {
  return `
    <tr data-product-id="${item.id}">
      <td class="ps-0">
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="img-fluid me-3" style="width: 80px; height: 80px; object-fit: cover;">
          <h6 class="mb-0">${item.name}</h6>
        </div>
      </td>
      <td class="text-center">$${item.price.toFixed(2)}</td>
      <td class="text-center">
        <div class="d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-sm btn-outline-secondary quantity-btn-decrease" data-product-id="${item.id}">-</button>
          <input type="number" min="1" value="${item.quantity}" class="form-control mx-2 text-center quantity-input" style="width: 60px;" data-product-id="${item.id}">
          <button type="button" class="btn btn-sm btn-outline-secondary quantity-btn-increase" data-product-id="${item.id}">+</button>
        </div>
      </td>
      <td class="text-center">$${(item.price * item.quantity).toFixed(2)}</td>
      <td class="text-end pe-0">
        <button type="button" class="btn btn-sm text-danger remove-item-btn" data-product-id="${item.id}">
          <i class="fa-light fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
}


function renderOrderSummaryItem(item) {
  return `
    <div class="d-flex justify-content-between mb-3">
      <span>${item.name} × ${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `;
}


function createCartPageButtons(productId) {
  
  const increaseBtn = document.createElement('button');
  increaseBtn.type = 'button';
  increaseBtn.className = 'btn btn-sm btn-outline-secondary quantity-btn-increase';
  increaseBtn.setAttribute('data-product-id', productId);
  increaseBtn.textContent = '+';
  increaseBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Increase button clicked for product ID:', productId);
    
    const cartItem = getCurrentCart().find(item => item.id === productId);
    if (cartItem) {
      updateCartItemQuantity(productId, cartItem.quantity + 1);
    }
  };
  
  
  const decreaseBtn = document.createElement('button');
  decreaseBtn.type = 'button';
  decreaseBtn.className = 'btn btn-sm btn-outline-secondary quantity-btn-decrease';
  decreaseBtn.setAttribute('data-product-id', productId);
  decreaseBtn.textContent = '-';
  decreaseBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Decrease button clicked for product ID:', productId);
    
    const cartItem = getCurrentCart().find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      updateCartItemQuantity(productId, cartItem.quantity - 1);
    }
  };
  
  
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.className = 'form-control mx-2 text-center quantity-input';
  quantityInput.style.width = '60px';
  quantityInput.setAttribute('data-product-id', productId);
  
  
  const cartItem = getCurrentCart().find(item => item.id === productId);
  if (cartItem) {
    quantityInput.value = cartItem.quantity;
  } else {
    quantityInput.value = 1;
  }
  
  quantityInput.onchange = function(e) {
    const quantity = parseInt(this.value);
    console.log('Quantity input changed for product ID:', productId, 'new value:', quantity);
    
    if (quantity > 0) {
      updateCartItemQuantity(productId, quantity);
    } else {
      
      this.value = 1;
      updateCartItemQuantity(productId, 1);
    }
  };
  
  
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm text-danger remove-item-btn';
  removeBtn.setAttribute('data-product-id', productId);
  removeBtn.innerHTML = '<i class="fa-light fa-trash-can"></i>';
  removeBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Remove button clicked for product ID:', productId);
    removeFromCart(productId);
  };
  
  return { increaseBtn, decreaseBtn, quantityInput, removeBtn };
}


function updateCartPage() {
  const cart = getCurrentCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartEl = document.getElementById('empty-cart');
  const cartContentEl = document.getElementById('cart-content');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.querySelector('a[href="./checkout.html"]');
  
  if (!cartItemsContainer) {
    console.warn('Cart items container not found');
    return;
  }

  console.log('Updating cart page, items:', cart.length);
  
  
  cartItemsContainer.innerHTML = '';

  
  if (cart.length === 0) {
    if (emptyCartEl) emptyCartEl.style.display = 'block';
    if (cartContentEl) cartContentEl.style.display = 'none';
    
    if (checkoutBtn) checkoutBtn.classList.add('disabled');
    return;
  } else {
    if (emptyCartEl) emptyCartEl.style.display = 'none';
    if (cartContentEl) cartContentEl.style.display = 'block';
    
    if (checkoutBtn) checkoutBtn.classList.remove('disabled');
  }
  
  
  cart.forEach(item => {
    
    const tr = document.createElement('tr');
    tr.setAttribute('data-product-id', item.id);
    
    
    const productCell = document.createElement('td');
    productCell.className = 'ps-0';
    
    const productDiv = document.createElement('div');
    productDiv.className = 'd-flex align-items-center';
    
    const productImg = document.createElement('img');
    productImg.src = item.image;
    productImg.alt = item.name;
    productImg.className = 'img-fluid me-3';
    productImg.style.width = '80px';
    productImg.style.height = '80px';
    productImg.style.objectFit = 'cover';
    
    const productName = document.createElement('h6');
    productName.className = 'mb-0';
    productName.textContent = item.name;
    
    productDiv.appendChild(productImg);
    productDiv.appendChild(productName);
    productCell.appendChild(productDiv);
    
    
    const priceCell = document.createElement('td');
    priceCell.className = 'text-center';
    priceCell.textContent = `$${item.price.toFixed(2)}`;
    
    
    const quantityCell = document.createElement('td');
    quantityCell.className = 'text-center';
    
    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'd-flex justify-content-center align-items-center';
    
    
    const { decreaseBtn, increaseBtn, quantityInput, removeBtn } = createCartPageButtons(item.id);
    
    quantityDiv.appendChild(decreaseBtn);
    quantityDiv.appendChild(quantityInput);
    quantityDiv.appendChild(increaseBtn);
    
    quantityCell.appendChild(quantityDiv);
    
    
    const subtotalCell = document.createElement('td');
    subtotalCell.className = 'text-center';
    subtotalCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    
    
    const actionCell = document.createElement('td');
    actionCell.className = 'text-end pe-0';
    actionCell.appendChild(removeBtn);
    
    
    tr.appendChild(productCell);
    tr.appendChild(priceCell);
    tr.appendChild(quantityCell);
    tr.appendChild(subtotalCell);
    tr.appendChild(actionCell);
    
    
    cartItemsContainer.appendChild(tr);
  });
  
  
  const total = getCartTotal();
  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${total.toFixed(2)}`;
  if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
}


function updateCheckoutPage() {
  const cart = getCurrentCart();
  const orderSummaryItemsEl = document.getElementById('order-summary-items');
  const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
  const checkoutTotalEl = document.getElementById('checkout-total');
  const placeOrderBtn = document.getElementById('place-order-btn');
  
  if (!orderSummaryItemsEl) {
    return;
  }
  
  
  if (isCartEmpty()) {
    window.location.href = './cart.html';
    return;
  }
  
  
  let summaryItemsHtml = '';
  cart.forEach(item => {
    summaryItemsHtml += renderOrderSummaryItem(item);
  });
  
  orderSummaryItemsEl.innerHTML = summaryItemsHtml;
  
  
  const total = getCartTotal();
  if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = `$${total.toFixed(2)}`;
  if (checkoutTotalEl) checkoutTotalEl.textContent = `$${total.toFixed(2)}`;
  
  
  if (placeOrderBtn) {
    placeOrderBtn.onclick = function(e) {
      e.preventDefault();
      
      const form = document.getElementById('checkout-form');
      if (form && form.checkValidity()) {
        processOrder();
      } else {
        
        form.reportValidity();
      }
    };
  }
}


function processOrder() {
  
  alert('Thank you for your order! Your order has been placed successfully.');
  clearCart();
  window.location.href = './index.html';
}


export function initializeCartPage() {
  console.log('Initializing cart page');
  
  
  const clearCartBtn = document.getElementById('clear-cart');
  if (clearCartBtn) {
    clearCartBtn.onclick = function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
      }
    };
  }
  
  
  updateCartPage();
  
  
  subscribeToCartChanges(() => {
    updateCartPage();
  });
  
  
  window.addEventListener('cart:updated', () => {
    console.log('Cart update event received in cart page');
    updateCartPage();
  });
}


export function initializeCheckoutPage() {
  
  if (isCartEmpty()) {
    window.location.href = './cart.html';
    return;
  }
  
  updateCheckoutPage();
  
  
  subscribeToCartChanges(() => {
    updateCheckoutPage();
  });
}


export function initializeCartPages() {
  const path = window.location.pathname;
  
  
  updateCartUI();
  
  if (path.includes('cart.html')) {
    initializeCartPage();
  } else if (path.includes('checkout.html')) {
    initializeCheckoutPage();
  }
}
