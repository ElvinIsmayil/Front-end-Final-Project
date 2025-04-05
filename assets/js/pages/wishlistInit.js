import { loadHeader, loadFooter } from '../components/layout.js';
import { initCartStore } from '../store/cart.js';
import { initWishlistStore, getCurrentWishlist, updateWishlistIcons } from '../store/wishlist.js';
import { initializeWishlistPages } from './wishlistPage.js';


document.addEventListener('DOMContentLoaded', function() {
  
  loadHeader();
  loadFooter();
  
  
  initCartStore();
  initWishlistStore();
  
  
  initializeWishlistPages();
  
  
  setTimeout(updateWishlistIcons, 500);
  
  
  const debugBtn = document.getElementById('debug-wishlist');
  if (debugBtn) {
    debugBtn.addEventListener('click', function() {
      const wishlist = getCurrentWishlist();
      console.log('Current wishlist:', wishlist);
      alert('Wishlist contains ' + wishlist.length + ' items. Check console for details.');
    });
  }
}); 