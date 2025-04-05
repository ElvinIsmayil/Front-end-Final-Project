import { 
  getCart, 
  addToCart as addToCartService, 
  removeFromCart as removeFromCartService,
  updateCartItemQuantity as updateQuantityService,
  clearCart as clearCartService,
  getCartTotal as getCartTotalService,
  updateCartCount
} from '../services/cartService.js';


const cartChangeListeners = [];


let isUpdating = false;


export function subscribeToCartChanges(callback) {
  if (typeof callback !== 'function') return () => {};
  
  
  cartChangeListeners.push(callback);
  
  
  return () => {
    const index = cartChangeListeners.indexOf(callback);
    if (index > -1) {
      cartChangeListeners.splice(index, 1);
    }
  };
}

function notifyCartChanges() {
  try {
    const cart = getCart();
    
    
    cartChangeListeners.forEach(callback => {
      try {
        callback(cart);
      } catch (err) {
        console.error('Error in cart listener:', err);
      }
    });
  } catch (err) {
    console.error('Error notifying cart changes:', err);
  }
}


export function forceCartUIUpdate() {
  const cart = getCart();
  
  updateCartCount();
  notifyCartChanges();
}


export function addToCart(product, quantity = 1) {
  const updatedCart = addToCartService(product, quantity);
  
  
  setTimeout(() => forceCartUIUpdate(), 10);
  
  return updatedCart;
}


export function removeFromCart(productId) {
  const updatedCart = removeFromCartService(productId);
  
  
  setTimeout(() => forceCartUIUpdate(), 10);
  
  return updatedCart;
}


export function updateCartItemQuantity(productId, quantity) {
  
  const validQuantity = Math.max(1, quantity);
  
  const updatedCart = updateQuantityService(productId, validQuantity);
  
  
  setTimeout(() => forceCartUIUpdate(), 10);
  
  return updatedCart;
}
export function clearCart() {
  const emptyCart = clearCartService();
  notifyCartChanges();
  return emptyCart;
}


export function getCurrentCart() {
  return getCart();
}

export function getCartTotal() {
  return getCartTotalService();
}

export function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function isCartEmpty() {
  return getCart().length === 0;
}


export function updateCartUI() {
  updateCartCount();
  notifyCartChanges();
}


export function initCartStore() {
  
  updateCartUI();
  
  
  window.addEventListener('storage', (event) => {
    if (event.key === 'rivon_cart') {
      updateCartUI();
    }
  });
  
  
  window.addEventListener('cart:updated', (event) => {
    forceCartUIUpdate();
  });
}
