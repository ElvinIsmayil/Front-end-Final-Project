const CART_STORAGE_KEY = 'rivon_cart';


export function getCart() {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    const cart = cartData ? JSON.parse(cartData) : [];
    return cart;
  } catch (err) {
    console.error('Error getting cart from localStorage:', err);
    return [];
  }
}

function _saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
}

export function addToCart(product, quantity = 1) {
  try {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      
      cart[existingItemIndex].quantity += quantity;
    } else {
      
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
    
    _saveCart(cart);
    updateCartCount();
    return cart;
  } catch (err) {
    console.error('Error adding item to cart:', err);
    return getCart();
  }
}


export function removeFromCart(productId) {
  let cart = getCart();
  const newCart = cart.filter(item => item.id !== productId);
  
  _saveCart(newCart);
  
  
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart: newCart, action: 'remove', productId } }));
  
  return newCart;
}


export function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = Math.max(1, quantity);
    _saveCart(cart);
    
    
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart, action: 'update', productId } }));
  }
  
  return cart;
}


export function clearCart() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
    return [];
  } catch (err) {
    console.error('Error clearing cart:', err);
    return getCart();
  }
}


export function getCartTotal() {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  } catch (err) {
    console.error('Error calculating cart total:', err);
    return 0;
  }
}


export function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  
  const countElements = document.querySelectorAll('.cart-count');
  countElements.forEach(element => {
    element.textContent = count.toString();
    
    
    if (count > 0) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
  
  return count;
} 