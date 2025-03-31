import { getAllData,getDataById } from "./services.js";
import { endpoints } from "./constants.js";

document.addEventListener("DOMContentLoaded", function() {
  initializeProducts();
});

document.addEventListener('DOMContentLoaded', function() {
  const cartOffcanvas = document.getElementById('cartOffcanvas');
  const navbar = document.querySelector('.navbar');
  const cartToggle = document.getElementById('cartToggle');
  
  // Prevent default action when clicking the cart icon (to avoid page reload)
  if (cartToggle) {
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
    });
  }
  
  // Apply custom styling to navbar when offcanvas opens
  if (cartOffcanvas) {
    cartOffcanvas.addEventListener('show.bs.offcanvas', function() {
      if (navbar) {
        // Ensure the navbar doesn't interfere with the sidebar
        navbar.style.position = 'relative';
        navbar.style.zIndex = '1000';
      }
      
      // Set the header text to "Your Shopping Cart" or "Item added to your cart" based on context
      const headerTitle = document.getElementById('cartOffcanvasLabel');
      // This logic determines if this is triggered by an "Add to Cart" action or just viewing the cart
      const isAddToCart = localStorage.getItem('lastCartAction') === 'add';
      
      if (headerTitle) {
        headerTitle.textContent = isAddToCart ? 'Item added to your cart' : 'Your Shopping Cart';
      }
      
      // Set the flag back to false
      localStorage.setItem('lastCartAction', 'view');
    });
    
    cartOffcanvas.addEventListener('hidden.bs.offcanvas', function() {
      if (navbar) {
        // Restore original styles
        navbar.style.zIndex = '';
        navbar.style.position = '';
      }
    });
  }
  
  // Initialize quantity buttons
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.quantity-input');
      let value = parseInt(input.value);
      
      if (this.textContent === '−' && value > 1) {
        input.value = value - 1;
        updateCartCount();
      } else if (this.textContent === '+') {
        input.value = value + 1;
        updateCartCount();
      }
    });
  });
  
  // Initialize remove links
  document.querySelectorAll('.remove-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const cartItem = this.closest('.cart-item');
      cartItem.style.opacity = '0';
      setTimeout(() => {
        cartItem.remove();
        updateCartCount();
        updateSubtotal();
      }, 300);
    });
  });
  
  // Function to update cart badge count
  function updateCartCount() {
    // Count all items in cart
    const quantities = document.querySelectorAll('.quantity-input');
    let totalItems = 0;
    quantities.forEach(input => {
      totalItems += parseInt(input.value);
    });
    
    // Update the badge
    document.querySelector('.cart-count').textContent = totalItems;
    
    // If cart is empty, show empty state
    if (totalItems === 0) {
      showEmptyCart();
    }
  }
  
  // Function to update subtotal
  function updateSubtotal() {
    // This is simplified - in a real app, you'd calculate based on prices and quantities
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    if (cartItems.length === 0) {
      document.querySelector('.cart-summary h5:last-child').textContent = '$0.00 USD';
      return;
    }
    
    // Simple calculation (would be more complex in real app)
    cartItems.forEach(item => {
      const priceText = item.querySelector('.cart-item-price').textContent;
      const price = parseFloat(priceText.replace('$', '').replace(',', ''));
      const quantity = parseInt(item.querySelector('.quantity-input').value);
      subtotal += price * quantity;
    });
    
    document.querySelector('.cart-summary h5:last-child').textContent = 
      '$' + subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' USD';
  }
  
  // Show empty cart state
  function showEmptyCart() {
    const cartContainer = document.querySelector('.cart-items-container');
    cartContainer.innerHTML = `
      <div class="text-center p-5">
        <i class="fas fa-shopping-cart fa-3x text-secondary mb-3"></i>
        <h5>Your cart is empty</h5>
        <p class="text-muted">Add items to your cart to see them here.</p>
        <a href="#" class="btn btn-outline-dark mt-3" data-bs-dismiss="offcanvas">Continue Shopping</a>
      </div>
    `;
    
    document.querySelector('.cart-summary h5:last-child').textContent = '$0.00 USD';
  }
});


async function initializeProducts() {
  try {
    const products = await getAllData(endpoints.products);
    
    
    renderFeaturedProducts(products);
    renderNewArrivals(products.slice(0, 4)); 
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


function renderFeaturedProducts(products) {
  const container = document.getElementById("cards");
  if (!container) {
    console.error("Element with ID 'cards' not found");
    return;
  }
  
  renderProductCards(products, container);
}


function renderNewArrivals(products) {
  const container = document.getElementById("new-arrival-cards");
  if (!container) {
    console.error("Element with ID 'new-arrival-cards' not found");
    return;
  }
  
  renderProductCards(products, container);
}

function renderProductCards(products, container) {
  products.forEach(product => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "col-6 col-md-4 col-lg-3";
    
    const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== "";
    const starRating = convertRatingToStars(product.rating);
    
    cardWrapper.innerHTML = `
      <div class="card product-card border-0 rounded-0 h-100">
        <div class="card-img-container position-relative overflow-hidden">
          <a href="#" class="d-block">
            <img src="${product.image}" class="card-img-top rounded-0 primary-img" alt="${product.name}">
            ${hasHoverImage ? `<img src="${product.hoverImage}" class="card-img-top rounded-0 hover-img" alt="${product.name} on model">` : ''}
          </a>
          
          <!-- Product badges -->
          <div class="product-badges position-absolute top-0 start-0 p-3">
            ${Math.random() > 0.7 ? '<span class="badge bg-danger">SALE</span>' : ''}
            ${Math.random() > 0.8 ? '<span class="badge bg-success ms-1">NEW</span>' : ''}
          </div>
          
          <!-- Product Actions -->
          <div class="product-actions">
            <button class="btn btn-action add-to-cart" data-id="${product.id}" title="Add to Cart">
              <i class="fas fa-shopping-bag"></i>
            </button>
            <button class="btn btn-action quick-view" data-id="${product.id}" title="Quick View">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-action add-to-wishlist" data-id="${product.id}" title="Add to Wishlist">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
        
        <div class="card-body text-center py-4">
          <!-- Product Category -->
          <div class="product-category small text-muted mb-1">
            ${getRandomCategory()}
          </div>
          
          <!-- Product Title -->
          <h5 class="card-title product-title mb-1">
            <a href="#" class="text-decoration-none text-dark">${product.name}</a>
          </h5>
          
          <!-- Product Rating -->
          <div class="product-rating mb-2">
            ${starRating}
          </div>
          
          <!-- Product Price -->
          <div class="product-price">
            ${Math.random() > 0.3 ? 
              `<span class="original-price text-muted text-decoration-line-through me-2">$${(product.price * 1.2).toFixed(2)}</span>` : 
              ''
            }
            <span class="current-price fw-bold">${product.price} ₼</span>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(cardWrapper);
    
    attachProductEventListeners(cardWrapper, product.id);
  });
}

function getRandomCategory() {
  const categories = ["Clothing", "Fashion", "Accessories", "Bestseller", "Premium", "Collection"];
  return categories[Math.floor(Math.random() * categories.length)];
}


function createProductCard(product) {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3";
  
  const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== "";
  const starRating = convertRatingToStars(product.rating);
  
  cardWrapper.innerHTML = `
    <div class="card border-0">
      <div class="card-img-container position-relative">
        <img src="${product.image}" class="card-img-top primary-img" alt="${product.name}">
        ${hasHoverImage ? `<img src="${product.hoverImage}" class="card-img-top hover-img" alt="${product.name} hover">` : ''}
        
        <div class="product-actions">
          <button class="btn btn-action add-to-cart" data-id="${product.id}" title="Add to Cart">
            <i class="fas fa-shopping-bag"></i>
          </button>
          <button class="btn btn-action quick-view" data-id="${product.id}" title="Quick View">
            <i class="fa-light fa-eye"></i>
          </button>
          <button class="btn btn-action add-to-wishlist" data-id="${product.id}" title="Add to Wishlist">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="card-body text-center">
        <div class="rating mb-1">
          ${starRating}
        </div>
        <h5 class="card-title">${product.name}</h5>
        <span>${product.price} ₼</span>
      </div>
    </div>
  `;
  
  return cardWrapper;
}


function attachProductEventListeners(cardElement, productId) {
  const addToCartButton = cardElement.querySelector(".add-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => addToCart(productId));
  }
  
  const quickViewButton = cardElement.querySelector(".quick-view");
  if (quickViewButton) {
    quickViewButton.addEventListener("click", () => quickView(productId));
  }
  
  const wishlistButton = cardElement.querySelector(".add-to-wishlist");
  if (wishlistButton) {
    wishlistButton.addEventListener("click", () => addToWishlist(productId));
  }
}


function convertRatingToStars(rating) {
  const roundedRating = Math.round(rating * 2) / 2;
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      stars += '<i class="fas fa-star text-warning"></i>';
    } else if (i - 0.5 === roundedRating) {
      stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    } else {
      stars += '<i class="far fa-star text-warning"></i>';
    }
  }

  return stars;
}


function addToCart(productId) {
  console.log("Added product to cart:", productId);
  
}


async function quickView(productId) {
  try {
    console.log("Quick view for product:", productId);
    
    // 1. Check if modal already exists, or create it
    let modalElement = document.getElementById('productQuickViewModal');
    if (!modalElement) {
      // Create modal element if it doesn't exist
      modalElement = document.createElement('div');
      modalElement.className = 'modal fade product-quick-view';
      modalElement.id = 'productQuickViewModal';
      modalElement.setAttribute('tabindex', '-1');
      modalElement.setAttribute('aria-hidden', 'true');
      
      modalElement.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title">Product Quick View</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="productModalContent">
              <!-- Content will be inserted here -->
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Continue Shopping</button>
            </div>
          </div>
        </div>
      `;
      
      // Add to body
      document.body.appendChild(modalElement);
    }
    
    // 2. Show loading state
    const modalContent = document.getElementById('productModalContent') || 
                        modalElement.querySelector('.modal-body');
    modalContent.innerHTML = '<div class="text-center py-5"><div class="spinner-border" role="status"></div></div>';
    
    // 3. Initialize Bootstrap modal and show it
    const bsModal = new bootstrap.Modal(modalElement);
    
    
    modalElement.addEventListener('show.bs.modal', function () {
      const topbar = document.querySelector('.topbar');
      const navbar = document.querySelector('.navbar');
      
      if (topbar) {
        topbar.classList.add('navbar-hidden');
      }
      
      if (navbar) {
        navbar.classList.add('navbar-hidden');
      }
      
      
      const overlay = document.createElement('div');
      overlay.className = 'modal-full-overlay';
      document.body.appendChild(overlay);
    });
    
    modalElement.addEventListener('hidden.bs.modal', function () {
      const topbar = document.querySelector('.topbar');
      const navbar = document.querySelector('.navbar');
      
      if (topbar) {
        topbar.classList.remove('navbar-hidden');
      }
      
      if (navbar) {
        navbar.classList.remove('navbar-hidden');
      }
      
      
      const overlay = document.querySelector('.modal-full-overlay');
      if (overlay) {
        overlay.remove();
      }
    });
    
    
    bsModal.show();
    
    // 5. Fetch product data properly
    const wantedProduct = await getDataById(endpoints.products, productId);
    console.log(wantedProduct.price);
    
    // 6. Update modal content with enhanced layout
    modalContent.innerHTML = `
      <div class="row g-0">
        <div class="col-md-6 product-image-container">
          <img src="${wantedProduct.image}" class="img-fluid product-detail-image" alt="${wantedProduct.name}">
        </div>
        <div class="col-md-6 p-4 p-md-5">
          <span class="badge bg-accent mb-2">In Stock</span>
          <h3 class="product-title mb-2">${wantedProduct.name}</h3>
          <div class="rating mb-3">
            ${convertRatingToStars(wantedProduct.rating)}
          </div>
          <h4 class="price mb-4">${wantedProduct.price} ₼</h4>
          <p class="product-description mb-4">
            ${wantedProduct.description || 'High-quality product made with premium materials. Perfect for everyday use with its elegant design and durable construction.'}
          </p>
          <div class="quantity-selector mb-3">
            <label for="productQuantity" class="form-label">Quantity</label>
            <div class="input-group product-quantity">
              <button class="btn btn-outline-secondary quantity-btn" type="button" id="decreaseQuantity">-</button>
              <input type="number" class="form-control text-center" value="1" min="1" id="productQuantity">
              <button class="btn btn-outline-secondary quantity-btn" type="button" id="increaseQuantity">+</button>
            </div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-dark btn-lg add-to-cart-modal" data-id="${wantedProduct.id}">
              <i class="fas fa-shopping-cart me-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    
    // 7. Add event listeners for quantity buttons
    const decreaseBtn = modalContent.querySelector('#decreaseQuantity');
    const increaseBtn = modalContent.querySelector('#increaseQuantity');
    const quantityInput = modalContent.querySelector('#productQuantity');
    
    decreaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
    
    // 8. Add event listener to the Add to Cart button
    const addToCartBtn = modalContent.querySelector('.add-to-cart-modal');
    addToCartBtn.addEventListener('click', function() {
      const quantity = parseInt(document.getElementById('productQuantity').value);
      addToCart(wantedProduct.id, quantity);
      
      // Show confirmation message
      const confirmationMessage = document.createElement('div');
      confirmationMessage.className = 'alert alert-success mt-3 add-to-cart-confirmation';
      confirmationMessage.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Product added to your cart!
      `;
      addToCartBtn.parentNode.appendChild(confirmationMessage);
      
      // Hide confirmation after delay
      setTimeout(() => {
        bsModal.hide(); // Close the modal after adding to cart
      }, 1500);
    });
    
  } catch (error) {
    console.error("Error in quickView:", error);
    const modalContent = document.getElementById('productModalContent');
    if (modalContent) {
      modalContent.innerHTML = '<div class="alert alert-danger">Error loading product details</div>';
    }
  }
}


function addToWishlist(productId) {
  console.log("Added product to wishlist:", productId);
  const favoriteCount = document.querySelector(".favorite-count")
  

}