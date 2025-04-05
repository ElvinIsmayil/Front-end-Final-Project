import { playVideo } from "./components/ui/video.js";
import "./components/ui/swipers/index.js";
import { initializeHomePage } from "./pages/homePage.js";
import { initializeProductsPage } from "./pages/productsPage.js";
import { initializeProductShowcase } from "./components/ui/product/productShowcase.js";
import { initCartSidebar, updateCartSidebar } from "./components/ui/cart/cartSidebar.js";
import { initWishlistSidebar } from "./components/ui/wishlist/wishlistSidebar.js";
import { initProductEvents } from "./components/ui/product/productEvents.js";
import { initializeCartPages } from "./pages/cartPage.js";
import { initializeWishlistPages } from "./pages/wishlistPage.js";
import { initQuickView } from "./components/ui/product/quickView.js";
import { 
  initCartStore, 
  removeFromCart, 
  updateCartItemQuantity, 
  getCurrentCart 
} from "./store/cart.js";
import {
  initWishlistStore,
  removeFromWishlist,
  toggleWishlistItem,
  moveToCart,
  updateWishlistIcons
} from "./store/wishlist.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  
  import("./components/layout.js").then(layout => {
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        
        layout.loadHeader();
        layout.loadFooter();
        
        
        import("./services/wishlistService.js").then(wishlistService => {
          wishlistService.updateWishlistCount();
        });
      });
    } else {
      
      layout.loadHeader();
      layout.loadFooter();
      
      
      import("./services/wishlistService.js").then(wishlistService => {
        wishlistService.updateWishlistCount();
      });
    }
  });

  if (typeof bootstrap === 'undefined' && typeof window.bootstrap !== 'undefined') {
    window.bootstrap = window.bootstrap;
  }

  
  
  import("./services/wishlistService.js").then(module => {
    module.updateWishlistCount();
    
    
    setTimeout(module.updateWishlistCount, 500);
  });

  
  initQuickView();

  window.removeCartItem = function(productId) {
    removeFromCart(parseInt(productId));
  };
  
  window.increaseQuantity = function(productId) {
    productId = parseInt(productId);
    const cartItem = getCurrentCart().find(item => item.id === productId);
    if (cartItem) {
      updateCartItemQuantity(productId, cartItem.quantity + 1);
    }
  };
  
  window.decreaseQuantity = function(productId) {
    productId = parseInt(productId);
    const cartItem = getCurrentCart().find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      updateCartItemQuantity(productId, cartItem.quantity - 1);
    }
  };
  
  window.updateQuantity = function(productId, value) {
    const quantity = parseInt(value);
    if (quantity > 0) {
      updateCartItemQuantity(parseInt(productId), quantity);
    }
  };
  
  
  window.toggleWishlist = function(product) {
    return toggleWishlistItem(product);
  };
  
  window.removeWishlistItem = function(productId) {
    removeFromWishlist(parseInt(productId));
  };
  
  window.moveToCart = function(productId) {
    moveToCart(parseInt(productId), addToCart);
  };

  
  initCartStore();
  initWishlistStore();

  
  initProductEvents();
  initCartSidebar();
  initWishlistSidebar();
  
  
  document.addEventListener('click', (event) => {
    const wishlistBtn = event.target.closest('[data-action="add-to-wishlist"]');
    if (wishlistBtn) {
      try {
        
        const icon = wishlistBtn.querySelector('i') || wishlistBtn.querySelector('svg');
        if (icon) {
          
          const isCurrentlyFavorite = icon.classList.contains('fa-solid') || 
                                     (icon.tagName.toLowerCase() === 'svg' && 
                                      icon.getAttribute('data-prefix') === 'fas');
          
          if (isCurrentlyFavorite) {
            
            if (icon.tagName.toLowerCase() === 'i') {
              icon.className = 'fa-light fa-heart';
            } else if (icon.tagName.toLowerCase() === 'svg') {
              icon.classList.remove('text-dark');
              icon.setAttribute('data-prefix', 'far');
              icon.className.baseVal = 'svg-inline--fa fa-heart';
            }
          } else {
            
            if (icon.tagName.toLowerCase() === 'i') {
              icon.className = 'fa-solid fa-heart text-dark';
            } else if (icon.tagName.toLowerCase() === 'svg') {
              icon.classList.add('text-dark');
              icon.setAttribute('data-prefix', 'fas');
              icon.className.baseVal = 'svg-inline--fa fa-heart text-dark';
            }
          }
        }
      } catch (err) {
        console.error('Error in wishlist icon immediate update:', err);
      }
    }
  }, true); 
  
  
  window.addEventListener('DOMContentLoaded', () => {
    updateWishlistIcons();
  });
  
  window.addEventListener('load', () => {
    setTimeout(updateWishlistIcons, 200);
  });
  
  
  updateWishlistIcons();
  
  
  initializeProductShowcase();

  if (path === "/" || path.includes("index")) {
    initializeHomePage();
  } else if (path.includes("all-products")) {
    initializeProductsPage();
  } else if (path.includes("wishlist.html")) {
    
    initializeWishlistPages();
  }
  
  
  initializeCartPages();
  
  
  const cartToggle = document.getElementById('cartToggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', function(e) {
      
      if (!e.target.hasAttribute('data-bs-toggle')) {
        e.preventDefault();
        const cartOffcanvas = document.getElementById('cartOffcanvas');
        if (cartOffcanvas) {
          try {
            if (typeof bootstrap !== 'undefined') {
              const bsOffcanvas = new bootstrap.Offcanvas(cartOffcanvas);
              bsOffcanvas.show();
            } else {
              
              cartOffcanvas.classList.add('show');
              document.body.classList.add('offcanvas-open');
            }
          } catch (error) {
            console.error('Error showing cart offcanvas:', error);
          }
        }
      }
    });
  }
  
  
  const wishlistToggle = document.getElementById('wishlistToggle');
  if (wishlistToggle) {
    wishlistToggle.addEventListener('click', function(e) {
      if (!e.target.hasAttribute('data-bs-toggle')) {
        e.preventDefault();
        const wishlistOffcanvas = document.getElementById('wishlistOffcanvas');
        if (wishlistOffcanvas) {
          try {
            if (typeof bootstrap !== 'undefined') {
              const bsOffcanvas = new bootstrap.Offcanvas(wishlistOffcanvas);
              bsOffcanvas.show();
            } else {
              
              wishlistOffcanvas.classList.add('show');
              document.body.classList.add('offcanvas-open');
            }
          } catch (error) {
            console.error('Error showing wishlist offcanvas:', error);
          }
        }
      }
    });
  }
});


