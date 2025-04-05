const WISHLIST_STORAGE_KEY = 'rivon_wishlist';


export function getWishlist() {
  try {
    const wishlistData = localStorage.getItem(WISHLIST_STORAGE_KEY);
    const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
    return wishlist;
  } catch (err) {
    console.error('Error getting wishlist from localStorage:', err);
    return [];
  }
}


function _saveWishlist(wishlist) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (err) {
    console.error('Error saving wishlist to localStorage:', err);
  }
}


export function addToWishlist(product) {
  try {
    if (!product || !product.id) {
      return getWishlist();
    }

    const wishlist = getWishlist();
    const existingItemIndex = wishlist.findIndex(item => String(item.id) === String(product.id));
    
    if (existingItemIndex < 0) {
      
      wishlist.push({
        id: product.id,
        name: product.name || 'Product',
        price: product.price || 0,
        image: product.image || ''
      });
    }
    
    
    _saveWishlist(wishlist);
    
    
    updateWishlistCount();
    
    try {
      
      const productId = product.id;
      const allButtons = document.querySelectorAll(`[data-action="add-to-wishlist"][data-product-id="${productId}"]`);
      
      allButtons.forEach(btn => {
        
        const icon = btn.querySelector('i') || btn.querySelector('svg');
        if (icon) {
          if (icon.tagName.toLowerCase() === 'i') {
            
            icon.className = 'fa-solid fa-heart text-dark';
          } else if (icon.tagName.toLowerCase() === 'svg') {
            
            icon.classList.add('text-dark');
            icon.setAttribute('data-prefix', 'fas');
            
            icon.className.baseVal = 'svg-inline--fa fa-heart text-dark';
          }
          btn.setAttribute('title', 'Remove from wishlist');
        }
      });
    } catch (uiErr) {
      console.error('Error updating UI for wishlist add:', uiErr);
    }
    
    
    try {
      window.dispatchEvent(new CustomEvent('wishlist:updated', { 
        detail: { wishlist, action: 'add', productId: product.id } 
      }));
    } catch (eventErr) {
      console.error('Error dispatching wishlist event:', eventErr);
    }
    
    return wishlist;
  } catch (err) {
    console.error('Error adding item to wishlist:', err);
    return getWishlist();
  }
}



export function removeFromWishlist(productId) {
  try {
    if (!productId) {
      return getWishlist();
    }

    let wishlist = getWishlist();
    const newWishlist = wishlist.filter(item => String(item.id) !== String(productId));
    
    
    _saveWishlist(newWishlist);
    
    
    updateWishlistCount();
    
    try {
      
      const allButtons = document.querySelectorAll(`[data-action="add-to-wishlist"][data-product-id="${productId}"]`);
      
      allButtons.forEach(btn => {
        
        const icon = btn.querySelector('i') || btn.querySelector('svg');
        if (icon) {
          if (icon.tagName.toLowerCase() === 'i') {
            
            icon.className = 'fa-light fa-heart';
          } else if (icon.tagName.toLowerCase() === 'svg') {
            
            icon.classList.remove('text-dark');
            icon.setAttribute('data-prefix', 'far');
            
            icon.className.baseVal = 'svg-inline--fa fa-heart';
          }
          btn.setAttribute('title', 'Add to wishlist');
        }
      });
    } catch (uiErr) {
      console.error('Error updating UI for wishlist removal:', uiErr);
    }
    
    
    try {
      window.dispatchEvent(new CustomEvent('wishlist:updated', { 
        detail: { wishlist: newWishlist, action: 'remove', productId } 
      }));
    } catch (eventErr) {
      console.error('Error dispatching wishlist event:', eventErr);
    }
    
    return newWishlist;
  } catch (err) {
    console.error('Error removing item from wishlist:', err);
    return getWishlist();
  }
}



export function isInWishlist(productId) {
  try {
    if (!productId) {
      return false;
    }
    
    const wishlist = getWishlist();
    const stringProductId = String(productId);
    return wishlist.some(item => String(item.id) === stringProductId);
  } catch (err) {
    console.error('Error checking if product is in wishlist:', err);
    return false;
  }
}

export function clearWishlist() {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    updateWishlistCount();
    
    window.dispatchEvent(new CustomEvent('wishlist:updated', { 
      detail: { wishlist: [], action: 'clear' } 
    }));
    
    return [];
  } catch (err) {
    console.error('Error clearing wishlist:', err);
    return getWishlist();
  }
}


export function moveToCart(productId, addToCartFn) {
  try {
    const wishlist = getWishlist();
    const product = wishlist.find(item => String(item.id) === String(productId));
    
    if (product) {
      addToCartFn(product);
      removeFromWishlist(productId);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error moving item to cart:', err);
    return false;
  }
}


export function updateWishlistCount() {
  try {
    const count = getWishlist().length;
    
    
    const countElements = document.querySelectorAll('.wishlist-count');
    
    if (countElements.length === 0) {
      
      
      let retryCount = 0;
      const retryUpdate = () => {
        try {
          const elements = document.querySelectorAll('.wishlist-count');
          if (elements.length > 0 || retryCount >= 5) {
            if (elements.length > 0) {
              updateElementsWithCount(elements, count);
            }
          } else {
            retryCount++;
            setTimeout(retryUpdate, 300);
          }
        } catch (retryErr) {
          console.error('Error in wishlist count retry:', retryErr);
        }
      };
      setTimeout(retryUpdate, 300);
      return count;
    }
    
    updateElementsWithCount(countElements, count);
    
    return count;
  } catch (err) {
    console.error('Error updating wishlist count:', err);
    return 0;
  }
}



function updateElementsWithCount(elements, count) {
  if (!elements || !elements.forEach) {
    console.error('Invalid elements provided to updateElementsWithCount');
    return;
  }
  
  elements.forEach(element => {
    try {
      
      element.textContent = count.toString();
      
      
      if (count > 0) {
        element.style.display = 'inline-block'; 
        element.classList.add('has-items'); 
      } else {
        element.style.display = 'none';
        element.classList.remove('has-items');
      }
    } catch (err) {
      console.error('Error updating individual count element:', err);
    }
  });
}


window.addEventListener('load', () => {
  setTimeout(updateWishlistCount, 200);
});


document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    updateWishlistCount();
  }
}); 