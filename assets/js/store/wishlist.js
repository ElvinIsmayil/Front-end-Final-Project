import { 
  getWishlist, 
  addToWishlist as addToWishlistService, 
  removeFromWishlist as removeFromWishlistService,
  clearWishlist as clearWishlistService,
  isInWishlist as checkIsInWishlist,
  moveToCart as moveToCartService,
  updateWishlistCount
} from '../services/wishlistService.js';


const wishlistChangeListeners = [];

export function subscribeToWishlistChanges(callback) {
  if (typeof callback !== 'function') return () => {};
  
  
  wishlistChangeListeners.push(callback);
  
  
  return () => {
    const index = wishlistChangeListeners.indexOf(callback);
    if (index > -1) {
      wishlistChangeListeners.splice(index, 1);
    }
  };
}

function notifyWishlistChanges() {
  try {
    const wishlist = getWishlist();
    
    
    wishlistChangeListeners.forEach(callback => {
      try {
        callback(wishlist);
      } catch (err) {
        console.error('Error in wishlist listener:', err);
      }
    });
  } catch (err) {
    console.error('Error notifying wishlist changes:', err);
  }
}


export function forceWishlistUIUpdate() {
  const wishlist = getWishlist();
  
  
  const event = new CustomEvent('wishlist:forceUpdate', { 
    detail: { wishlist, timestamp: Date.now() } 
  });
  window.dispatchEvent(event);
  
  
  updateWishlistCount();
  setTimeout(() => updateWishlistCount(), 100);
  setTimeout(() => updateWishlistCount(), 300);
  
  
  updateWishlistIcons();
  notifyWishlistChanges();
}

export function addToWishlist(product) {
  const updatedWishlist = addToWishlistService(product);
  
  
  forceWishlistUIUpdate();
  
  return updatedWishlist;
}

export function removeFromWishlist(productId) {
  const updatedWishlist = removeFromWishlistService(productId);
  
  
  forceWishlistUIUpdate();
  
  return updatedWishlist;
}


export function toggleWishlistItem(product) {
  
  if (!product || !product.id) {
    console.error('Invalid product object for wishlist toggle:', product);
    return false;
  }
  
  try {
    
    const isInList = isInWishlist(product.id);
    
    
    if (isInList) {
      
      removeFromWishlist(product.id);
      return false;
    } else {
      
      addToWishlist(product);
      return true;
    }
  } catch (err) {
    console.error('Error in toggleWishlistItem:', err);
    return false;
  }
}

export function clearWishlist() {
  const emptyWishlist = clearWishlistService();
  notifyWishlistChanges();
  return emptyWishlist;
}


export function moveToCart(productId, addToCartFn) {
  const success = moveToCartService(productId, addToCartFn);
  
  if (success) {
    
    setTimeout(() => forceWishlistUIUpdate(), 10);
  }
  
  return success;
}


export function getCurrentWishlist() {
  return getWishlist();
}


export function isInWishlist(productId) {
  try {
    const wishlist = getWishlist();
    
    return wishlist.some(item => String(item.id) === String(productId));
  } catch (err) {
    console.error('Error checking if product is in wishlist:', err);
    return false;
  }
}


export function getWishlistItemCount() {
  const wishlist = getWishlist();
  return wishlist.length;
}


export function isWishlistEmpty() {
  return getWishlist().length === 0;
}


export function updateWishlistUI() {
  updateWishlistCount();
  notifyWishlistChanges();
}


const initMutationObserver = () => {
  
  if (window.wishlistMutationObserver) return;
  
  
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { 
            if (
              node.querySelector?.('[data-action="add-to-wishlist"]') || 
              node.matches?.('[data-action="add-to-wishlist"]') ||
              node.querySelector?.('.wishlist-count') ||
              node.matches?.('.wishlist-count')
            ) {
              shouldUpdate = true;
            }
          }
        });
      }
    });
    
    if (shouldUpdate) {
      updateWishlistIcons();
      updateWishlistCount();
    }
  });
  
  
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: false,
    characterData: false
  });
  
  
  window.wishlistMutationObserver = observer;
};

export function initWishlistStore() {
  
  const currentWishlist = getWishlist();
  
  
  updateWishlistUI();
  
  
  window.addEventListener('storage', (event) => {
    if (event.key === 'rivon_wishlist') {
      updateWishlistUI();
    }
  });
  
  
  window.addEventListener('wishlist:updated', (event) => {
    
    const productId = event.detail?.productId;
    if (productId) {
      
      const allButtons = document.querySelectorAll(`[data-action="add-to-wishlist"][data-product-id="${productId}"]`);
      const action = event.detail?.action;
      const isAddAction = action === 'add';
      
      allButtons.forEach(btn => {
        const btnIcon = btn.querySelector('i');
        if (btnIcon) {
          if (isAddAction) {
            btnIcon.className = 'fa-solid fa-heart text-dark';
            btn.setAttribute('title', 'Remove from wishlist');
          } else {
            btnIcon.className = 'fa-light fa-heart';
            btn.setAttribute('title', 'Add to wishlist');
          }
        }
      });
    }
    
    
    updateWishlistCount();
    updateWishlistIcons();
  });
  
  
  window.addEventListener('wishlist:forceUpdate', () => {
    updateWishlistIcons();
    updateWishlistCount();
  });
  
  
  
  updateWishlistIcons();
  
  
  setTimeout(() => updateWishlistIcons(), 100);
  setTimeout(() => updateWishlistIcons(), 500);
  setTimeout(() => updateWishlistIcons(), 1000);
  
  
  window.addEventListener('load', () => {
    updateWishlistIcons();
    initMutationObserver();
  });
  
  
  if (document.readyState === 'complete') {
    initMutationObserver();
  }
}


export function updateWishlistIcons() {
  
  const wishlist = getWishlist();
  
  
  updateWishlistCount();
  
  try {
    
    const wishlistBtns = document.querySelectorAll('[data-action="add-to-wishlist"]');
    
    if (wishlistBtns.length === 0) {
      return;
    }
    
    
    wishlistBtns.forEach(btn => {
      try {
        const productId = btn.getAttribute('data-product-id');
        
        if (!productId) {
          return;
        }
        
        
        const isFavorite = wishlist.some(item => String(item.id) === String(productId));
        
        
        const icon = btn.querySelector('i') || btn.querySelector('svg');
        if (!icon) {
          return;
        }
        
        
        if (isFavorite) {
          if (icon.tagName.toLowerCase() === 'i') {
            
            icon.className = 'fa-solid fa-heart text-dark';
          } else if (icon.tagName.toLowerCase() === 'svg') {
            
            icon.classList.add('text-dark');
            icon.setAttribute('data-prefix', 'fas');
            
            icon.className.baseVal = 'svg-inline--fa fa-heart text-dark';
          }
          btn.setAttribute('title', 'Remove from wishlist');
        } else {
          if (icon.tagName.toLowerCase() === 'i') {
            
            icon.className = 'fa-light fa-heart';
          } else if (icon.tagName.toLowerCase() === 'svg') {
            
            icon.classList.remove('text-dark');
            icon.setAttribute('data-prefix', 'far');
            
            icon.className.baseVal = 'svg-inline--fa fa-heart';
          }
          btn.setAttribute('title', 'Add to wishlist');
        }
      } catch (err) {
        console.error('Error updating individual wishlist button:', err);
      }
    });
  } catch (err) {
    console.error('Error in updateWishlistIcons:', err);
  }
}
