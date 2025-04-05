import { convertRatingToStars } from "../../../utils/helper.js";
import { addToCart } from "../../../store/cart.js";
import { toggleWishlistItem, isInWishlist } from "../../../store/wishlist.js";


function createQuickViewModal() {
  
  if (document.getElementById('quickViewModal')) {
    return;
  }

  const modalHTML = `
    <div class="modal fade" id="quickViewModal" tabindex="-1" aria-labelledby="quickViewModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 shadow">
          <div class="modal-header border-0 bg-light">
            <h5 class="modal-title visually-hidden" id="quickViewModalLabel">Quick View</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="row g-0" id="quickViewContent">
              <!-- Content will be inserted here -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>
      #quickViewModal .modal-content {
        overflow: hidden;
        border-radius: 0.5rem;
      }
      #quickViewModal .product-image-gallery {
        position: relative;
        height: 100%;
        background-color: #f8f9fa;
      }
      #quickViewModal .product-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 400px;
        overflow: hidden;
      }
      #quickViewModal .carousel, 
      #quickViewModal .carousel-inner, 
      #quickViewModal .carousel-item {
        height: 100%;
        min-height: 400px;
      }
      #quickViewModal .carousel-item img {
        object-fit: contain;
        height: 100%;
        width: 100%;
        padding: 2rem;
        transition: transform 0.3s ease;
      }
      #quickViewModal .carousel-item img:hover {
        transform: scale(1.05);
      }
      #quickViewModal .carousel-control-prev,
      #quickViewModal .carousel-control-next {
        width: 40px;
        height: 40px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        opacity: 0.7;
      }
      #quickViewModal .carousel-control-prev {
        left: 10px;
      }
      #quickViewModal .carousel-control-next {
        right: 10px;
      }
      #quickViewModal .image-thumbnails {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        padding: 5px;
      }
      #quickViewModal .image-thumbnails .btn {
        width: 30px;
        height: 30px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 500;
        transition: all 0.2s;
      }
      #quickViewModal .image-thumbnails .btn.active {
        background-color: #212529;
        color: white;
      }
      #quickViewModal .product-details {
        padding: 2rem;
      }
      #quickViewModal .quantity-selector {
        display: flex;
        align-items: center;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        overflow: hidden;
      }
      #quickViewModal .quantity-selector button {
        background: #f8f9fa;
        border: none;
        width: 40px;
        height: 40px;
        font-size: 16px;
        transition: all 0.2s;
      }
      #quickViewModal .quantity-selector button:hover {
        background: #e9ecef;
      }
      #quickViewModal .quantity-selector input {
        border: none;
        width: 50px;
        text-align: center;
        font-weight: 500;
      }
      #quickViewModal .btn-add-to-cart {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }
      #quickViewModal .btn-add-to-cart:hover {
        transform: translateY(-2px);
      }
      #quickViewModal .wishlist-btn {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }
      #quickViewModal .wishlist-btn:hover {
        transform: translateY(-2px);
      }
      #quickViewModal .product-meta {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #f0f0f0;
      }
      #quickViewModal .badge.sale-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 10;
        padding: 8px 15px;
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      #quickViewModal .sku-tag {
        font-size: 0.85rem;
        color: #6c757d;
      }
      #quickViewModal .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      #quickViewModal .tag {
        display: inline-block;
        padding: 4px 8px;
        background-color: #f8f9fa;
        border-radius: 4px;
        font-size: 0.8rem;
        color: #495057;
        transition: all 0.2s;
      }
      #quickViewModal .tag:hover {
        background-color: #e9ecef;
      }
      #quickViewModal .social-share a {
        color: #495057;
        transition: all 0.2s;
        font-size: 0.9rem;
      }
      #quickViewModal .social-share a:hover {
        color: #0d6efd;
      }
      
     
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
      
      .pulse-animation {
        animation: pulse 0.4s ease-in-out;
      }
      
     
      @media (max-width: 768px) {
        #quickViewModal .product-image-container {
          min-height: 300px;
        }
        #quickViewModal .product-details {
          padding: 1.5rem;
        }
      }
    </style>
  `;

  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}


export function showQuickView(product) {
  
  createQuickViewModal();

  const contentContainer = document.getElementById('quickViewContent');
  if (!contentContainer) {
    console.error('Quick view content container not found');
    return;
  }

  
  const isWishlisted = isInWishlist(String(product.id));
  const heartIcon = isWishlisted ? 'fa-solid fa-heart text-dark' : 'fa-light fa-heart';
  const wishlistTitle = isWishlisted ? 'Remove from wishlist' : 'Add to wishlist';

  
  const starRating = convertRatingToStars(product.rating || 0);
  
  
  let tagsHTML = '';
  if (product.tags) {
    const tagsList = product.tags.split(',').map(tag => tag.trim());
    tagsHTML = tagsList.map(tag => `<span class="tag">${tag}</span>`).join('');
  }
  
  
  const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== '';
  
  
  let imageGalleryHTML = '';
  if (hasHoverImage) {
    imageGalleryHTML = `
      <div class="product-image-container bg-light position-relative">
        <div id="productImageCarousel" class="carousel slide" data-bs-ride="false" data-bs-interval="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${product.image}" class="d-block w-100" alt="${product.name}">
            </div>
            <div class="carousel-item">
              <img src="${product.hoverImage}" class="d-block w-100" alt="${product.name} - alternate view">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-dark rounded-circle p-1" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon bg-dark rounded-circle p-1" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="image-thumbnails position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
          <button class="btn btn-sm btn-light rounded-circle active" data-bs-target="#productImageCarousel" data-bs-slide-to="0" aria-current="true">
            1
          </button>
          <button class="btn btn-sm btn-light rounded-circle" data-bs-target="#productImageCarousel" data-bs-slide-to="1">
            2
          </button>
        </div>
      </div>
    `;
  } else {
    imageGalleryHTML = `
      <div class="product-image-container bg-light d-flex align-items-center justify-content-center">
        <img src="${product.image}" class="img-fluid" alt="${product.name}">
      </div>
    `;
  }

  
  contentContainer.innerHTML = `
    <div class="col-md-6">
      <div class="product-image-gallery">
        ${product.discount ? `<span class="badge bg-danger sale-badge">SALE ${product.discount}% OFF</span>` : ''}
        ${imageGalleryHTML}
      </div>
    </div>
    <div class="col-md-6">
      <div class="product-details">
        <div class="mb-1">
          <span class="sku-tag">${product.sku || `SKU-${product.id}`}</span>
        </div>
        <h3 class="product-title fw-bold mb-2">${product.name}</h3>
        
        <div class="product-rating mb-3 d-flex align-items-center">
          ${starRating}
          <span class="ms-2 text-muted">(${product.reviewCount || 0} reviews)</span>
        </div>
        
        <div class="product-price mb-4">
          <span class="fw-bold fs-3">$${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
          ${product.oldPrice ? `<span class="text-decoration-line-through text-muted ms-2">$${product.oldPrice}</span>` : ''}
        </div>
        
        <div class="product-description mb-4">
          <p class="text-muted">${product.description || 'No description available.'}</p>
        </div>
        
        <div class="product-actions d-flex flex-wrap gap-3 mb-4">
          <div class="quantity-selector">
            <button class="btn" id="qv-decrease-qty" title="Decrease quantity">
              <i class="fa-solid fa-minus small"></i>
            </button>
            <input type="number" class="form-control" id="qv-quantity" value="1" min="1">
            <button class="btn" id="qv-increase-qty" title="Increase quantity">
              <i class="fa-solid fa-plus small"></i>
            </button>
          </div>
          
          <button class="btn btn-primary flex-grow-1 btn-add-to-cart" id="qv-add-to-cart" data-product-id="${product.id}">
            <i class="fa-light fa-cart-shopping me-2"></i> Add to Cart
          </button>
          
          <button class="btn btn-outline-secondary wishlist-btn" id="qv-add-to-wishlist" data-product-id="${product.id}" title="${wishlistTitle}">
            <i class="${heartIcon}"></i>
          </button>
        </div>
        
        <div class="product-meta">
          <div class="row mb-2">
            <div class="col-4 fw-medium">Category:</div>
            <div class="col-8">${product.category || 'Uncategorized'}</div>
          </div>
          ${product.tags ? `
          <div class="row">
            <div class="col-4 fw-medium">Tags:</div>
            <div class="col-8">
              <div class="tags-list">
                ${tagsHTML}
              </div>
            </div>
          </div>` : ''}
          <div class="row mt-3">
            <div class="col-12">
              <div class="d-flex gap-2 social-share">
                <a href="#" class="text-decoration-none" onclick="return false;">
                  <i class="fa-brands fa-facebook-f me-1"></i> Share
                </a>
                <a href="#" class="text-decoration-none" onclick="return false;">
                  <i class="fa-brands fa-twitter me-1"></i> Tweet
                </a>
                <a href="#" class="text-decoration-none" onclick="return false;">
                  <i class="fa-brands fa-pinterest me-1"></i> Pin it
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  
  setupQuickViewEvents(product);

  
  if (hasHoverImage) {
    try {
      const carousel = document.getElementById('productImageCarousel');
      if (carousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carousel);
      }
    } catch (error) {
      console.error('Error initializing carousel:', error);
    }
  }

  
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }
}


function setupQuickViewEvents(product) {
  
  const quantityInput = document.getElementById('qv-quantity');
  const decreaseBtn = document.getElementById('qv-decrease-qty');
  const increaseBtn = document.getElementById('qv-increase-qty');
  
  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        decreaseBtn.classList.add('pulse-animation');
        setTimeout(() => decreaseBtn.classList.remove('pulse-animation'), 400);
      }
    });
  }
  
  if (increaseBtn) {
    increaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
      increaseBtn.classList.add('pulse-animation');
      setTimeout(() => increaseBtn.classList.remove('pulse-animation'), 400);
    });
  }
  
  
  const addToCartBtn = document.getElementById('qv-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value);
      if (quantity > 0) {
        
        addToCartBtn.classList.add('pulse-animation');
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Adding...';
        
        
        setTimeout(() => {
          
          addToCart({...product, quantity});
          
          
          addToCartBtn.classList.remove('btn-primary');
          addToCartBtn.classList.add('btn-success');
          addToCartBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Added to Cart!';
          
          
          setTimeout(() => {
            addToCartBtn.classList.remove('btn-success', 'pulse-animation');
            addToCartBtn.classList.add('btn-primary');
            addToCartBtn.innerHTML = '<i class="fa-light fa-cart-shopping me-2"></i> Add to Cart';
            addToCartBtn.disabled = false;
          }, 1500);
        }, 500);
      }
    });
  }
  
  
  const wishlistBtn = document.getElementById('qv-add-to-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      
      wishlistBtn.classList.add('pulse-animation');
      
      
      const isAdded = toggleWishlistItem(product);
      
      
      const icon = wishlistBtn.querySelector('i');
      if (icon) {
        if (isAdded) {
          icon.className = 'fa-solid fa-heart text-dark';
          wishlistBtn.setAttribute('title', 'Remove from wishlist');
          wishlistBtn.classList.remove('btn-outline-secondary');
          wishlistBtn.classList.add('btn-dark');
        } else {
          icon.className = 'fa-light fa-heart';
          wishlistBtn.setAttribute('title', 'Add to wishlist');
          wishlistBtn.classList.remove('btn-dark');
          wishlistBtn.classList.add('btn-outline-secondary');
        }
      }
      
      
      setTimeout(() => wishlistBtn.classList.remove('pulse-animation'), 400);
    });
  }
  
  
  const socialLinks = document.querySelectorAll('#quickViewModal .social-share a');
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      link.classList.add('pulse-animation');
      setTimeout(() => link.classList.remove('pulse-animation'), 400);
    });
  });
}


export function initQuickView() {
  
  createQuickViewModal();
  
  
  document.addEventListener('click', (event) => {
    const quickViewBtn = event.target.closest('[data-action="quick-view"]');
    if (quickViewBtn) {
      event.preventDefault();
      
      
      const productId = quickViewBtn.getAttribute('data-product-id');
      const productDataElem = quickViewBtn.closest('[data-product-data]');
      
      if (productDataElem) {
        try {
          const productData = JSON.parse(productDataElem.getAttribute('data-product-data'));
          showQuickView(productData);
        } catch (error) {
          console.error('Error parsing product data for quick view:', error);
        }
      } else {
        console.warn('Quick view clicked but no product data found');
      }
    }
  });
} 