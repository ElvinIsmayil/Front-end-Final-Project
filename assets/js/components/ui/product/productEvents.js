import { addToCart } from "../../../store/cart.js";
import { updateCartSidebar } from "../cart/cartSidebar.js";
import { toggleWishlistItem, isInWishlist, updateWishlistIcons } from "../../../store/wishlist.js";
import { updateWishlistSidebar } from "../wishlist/wishlistSidebar.js";
import { showQuickView } from "./quickView.js";


export function initProductEvents() {
  
  document.addEventListener('click', (event) => {
    
    const actionBtn = event.target.closest('[data-action]');
    
    
    if (!actionBtn) return;
    
    
    event.preventDefault();
    
    
    const action = actionBtn.getAttribute('data-action');
    const productId = actionBtn.getAttribute('data-product-id');
    
    
    let product = null;
    try {
      const productDataStr = actionBtn.getAttribute('data-product-data');
      if (productDataStr) {
        product = JSON.parse(productDataStr);
      }
    } catch (err) {
      console.error('Error parsing product data:', err);
    }
    
    
    if (!product) {
      try {
        const productContainer = actionBtn.closest('[data-product-data]');
        if (productContainer) {
          product = JSON.parse(productContainer.getAttribute('data-product-data'));
        }
      } catch (err) {
        console.error('Error parsing product data from container:', err);
      }
    }
    
    
    if (!product && productId) {
      product = { id: productId };
    }
    
    
    switch(action) {
      case 'add-to-cart':
        if (product) {
          addToCart(product);
          
          
          const icon = actionBtn.querySelector('i');
          if (icon) {
            const originalClass = icon.className;
            icon.className = 'fa-solid fa-check';
            
            
            setTimeout(() => {
              icon.className = originalClass;
            }, 1000);
          }
        }
        break;
        
      case 'add-to-wishlist':
        if (product) {
          try {
            
            const icon = actionBtn.querySelector('i') || actionBtn.querySelector('svg');
            
            
            const isCurrentlyInWishlist = isInWishlist(product.id);
            const willBeAdded = !isCurrentlyInWishlist;
            
            
            if (icon) {
              if (willBeAdded) {
                if (icon.tagName.toLowerCase() === 'i') {
                  
                  icon.className = 'fa-solid fa-heart text-dark';
                } else if (icon.tagName.toLowerCase() === 'svg') {
                  
                  icon.classList.add('text-dark');
                  icon.setAttribute('data-prefix', 'fas');
                  
                  icon.className.baseVal = 'svg-inline--fa fa-heart text-dark';
                }
                actionBtn.setAttribute('title', 'Remove from wishlist');
              } else {
                if (icon.tagName.toLowerCase() === 'i') {
                  
                  icon.className = 'fa-light fa-heart';
                } else if (icon.tagName.toLowerCase() === 'svg') {
                  
                  icon.classList.remove('text-dark');
                  icon.setAttribute('data-prefix', 'far');
                  
                  icon.className.baseVal = 'svg-inline--fa fa-heart';
                }
                actionBtn.setAttribute('title', 'Add to wishlist');
              }
            }
            
            
            showWishlistFeedback(
              product.name || 'Product', 
              willBeAdded ? 'added' : 'removed'
            );
            
            
            setTimeout(() => toggleWishlistItem(product), 0);
          } catch (err) {
            console.error('Error handling wishlist toggle:', err);
          }
        }
        break;
        
      case 'quick-view':
        if (product) {
          showQuickView(product);
        } else {
          console.error('Cannot show quick view - product data missing');
        }
        break;
    }
  });
  
  
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      
      const productTitle = document.querySelector('.product-title')?.textContent || 'Product';
      const productPrice = parseFloat(document.querySelector('.price h4')?.textContent.replace('$', '') || 0);
      const productImage = document.querySelector('.main-image img')?.src || '';
      const quantityInput = document.querySelector('.quantity-value');
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      
      
      const product = {
        id: Date.now(), 
        name: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1
      };
      
      
      addToCart(product, quantity);
      
      
      updateCartSidebar();
      
      
      showAddToCartFeedback(productTitle);
      
      
      showCartSidebar();
    });
  }
  
  
  const addToWishlistBtn = document.querySelector('.add-to-wishlist-btn');
  if (addToWishlistBtn) {
    addToWishlistBtn.addEventListener('click', function() {
      
      const productTitle = document.querySelector('.product-title')?.textContent || 'Product';
      const productPrice = parseFloat(document.querySelector('.price h4')?.textContent.replace('$', '') || 0);
      const productImage = document.querySelector('.main-image img')?.src || '';
      
      
      const product = {
        id: Date.now(), 
        name: productTitle,
        price: productPrice,
        image: productImage
      };
      
      
      const isAdded = toggleWishlistItem(product);
      
      
      const icon = this.querySelector('i');
      if (icon) {
        if (isAdded) {
          icon.className = 'fa-solid fa-heart text-dark';
          this.setAttribute('title', 'Remove from wishlist');
          showWishlistFeedback(productTitle, 'added');
        } else {
          icon.className = 'fa-light fa-heart';
          this.setAttribute('title', 'Add to wishlist');
          showWishlistFeedback(productTitle, 'removed');
        }
      }
    });
  }
  
  
  setTimeout(() => updateWishlistButtonStates(), 100);
}


function showCartSidebar() {
  const cartOffcanvas = document.getElementById('cartOffcanvas');
  if (cartOffcanvas) {
    try {
      
      if (typeof bootstrap !== 'undefined') {
        const bsOffcanvas = new bootstrap.Offcanvas(cartOffcanvas);
        bsOffcanvas.show();
      } else {
        
        cartOffcanvas.classList.add('show');
        document.body.classList.add('offcanvas-open');
        const backdrop = document.createElement('div');
        backdrop.className = 'offcanvas-backdrop show';
        document.body.appendChild(backdrop);
      }
    } catch (err) {
      
      cartOffcanvas.style.visibility = 'visible';
      cartOffcanvas.classList.add('show');
    }
  }
}


function showWishlistSidebar() {
  const wishlistOffcanvas = document.getElementById('wishlistOffcanvas');
  if (wishlistOffcanvas) {
    try {
      
      if (typeof bootstrap !== 'undefined') {
        const bsOffcanvas = new bootstrap.Offcanvas(wishlistOffcanvas);
        bsOffcanvas.show();
      } else {
        
        wishlistOffcanvas.classList.add('show');
        document.body.classList.add('offcanvas-open');
        const backdrop = document.createElement('div');
        backdrop.className = 'offcanvas-backdrop show';
        document.body.appendChild(backdrop);
      }
    } catch (err) {
      
      wishlistOffcanvas.style.visibility = 'visible';
      wishlistOffcanvas.classList.add('show');
    }
  }
}


function showAddToCartFeedback(productName) {
  
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  
  const toastId = `toast-${Date.now()}`;
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <i class="fa-light fa-check-circle me-2"></i>
          ${productName} has been added to your cart.
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  
  const toastElement = document.getElementById(toastId);
  try {
    if (typeof bootstrap !== 'undefined') {
      const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
      toast.show();
    } else {
      
      toastElement.classList.add('show');
      setTimeout(() => {
        toastElement.remove();
      }, 3000);
    }
  } catch (error) {
    
    toastElement.style.display = 'block';
    setTimeout(() => {
      toastElement.remove();
    }, 3000);
  }
  
  
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}


function showWishlistFeedback(productName, action) {
  
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  
  const toastId = `toast-${Date.now()}`;
  const bgColor = action === 'added' ? 'bg-danger' : 'bg-dark';
  const icon = action === 'added' ? 'fa-heart' : 'fa-heart-crack';
  const message = action === 'added' ? 
    `${productName} has been added to your wishlist.` : 
    `${productName} has been removed from your wishlist.`;
  
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <i class="fa-light ${icon} me-2"></i>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  
  const toastElement = document.getElementById(toastId);
  try {
    if (typeof bootstrap !== 'undefined') {
      const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
      toast.show();
    } else {
      
      toastElement.classList.add('show');
      setTimeout(() => {
        toastElement.remove();
      }, 3000);
    }
  } catch (error) {
    
    toastElement.style.display = 'block';
    setTimeout(() => {
      toastElement.remove();
    }, 3000);
  }
  
  
  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}


function updateWishlistButtonStates() {
  const wishlistButtons = document.querySelectorAll('button[data-action="add-to-wishlist"]');
  
  if (wishlistButtons.length === 0) {
    setTimeout(updateWishlistButtonStates, 500);
    return;
  }
  
  wishlistButtons.forEach(button => {
    try {
      
      const productId = button.getAttribute('data-product-id');
      if (!productId) {
        return;
      }
      
      
      const inWishlist = isInWishlist(productId);
      
      
      const icon = button.querySelector('i') || button.querySelector('svg');
      if (icon) {
        if (inWishlist) {
          if (icon.tagName.toLowerCase() === 'i') {
            
            icon.className = 'fa-solid fa-heart text-dark';
          } else if (icon.tagName.toLowerCase() === 'svg') {
            
            icon.classList.add('text-dark');
            icon.setAttribute('data-prefix', 'fas');
            
            icon.className.baseVal = 'svg-inline--fa fa-heart text-dark';
          }
          button.setAttribute('title', 'Remove from wishlist');
        } else {
          if (icon.tagName.toLowerCase() === 'i') {
            
            icon.className = 'fa-light fa-heart';
          } else if (icon.tagName.toLowerCase() === 'svg') {
            
            icon.classList.remove('text-dark');
            icon.setAttribute('data-prefix', 'far');
            
            icon.className.baseVal = 'svg-inline--fa fa-heart';
          }
          button.setAttribute('title', 'Add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error updating wishlist button state:', error);
    }
  });
} 