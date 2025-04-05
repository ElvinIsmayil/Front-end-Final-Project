
export function initializeProductShowcase() {
  initializeThumbnailGallery();
  initializeColorSelector();
  initializeSizeSelector();
  initializeQuantitySelector();
  initializeAddToCart();
}

function initializeThumbnailGallery() {
  const thumbnailItems = document.querySelectorAll('.thumbnail-item');
  const mainImage = document.querySelector('.main-image img');
  
  if (thumbnailItems.length && mainImage) {
    thumbnailItems.forEach(item => {
      item.addEventListener('click', function() {
        thumbnailItems.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
        const newSrc = this.querySelector('img').src;
        mainImage.src = newSrc;
      });
    });
  }
}


function initializeColorSelector() {
  const colorOptions = document.querySelectorAll('.color-option input[type="radio"]');
  const colorText = document.querySelector('.color-options p strong');
  
  if (colorOptions.length && colorText) {
    colorOptions.forEach(option => {
      option.addEventListener('change', function() {
        const colorName = this.id.replace('color-', '');
        colorText.nextSibling.nodeValue = ' ' + colorName.charAt(0).toUpperCase() + colorName.slice(1);
      });
    });
  }
}


function initializeSizeSelector() {
  const sizeButtons = document.querySelectorAll('.size-selector .btn');
  const sizeText = document.querySelector('.size-options p strong');
  
  if (sizeButtons.length && sizeText) {
    sizeButtons.forEach(button => {
      button.addEventListener('click', function() {
        sizeButtons.forEach(btn => {
          btn.classList.remove('btn-dark');
          btn.classList.add('btn-outline-dark');
        });
        
        this.classList.remove('btn-outline-dark');
        this.classList.add('btn-dark');
        
        sizeText.nextSibling.nodeValue = ' ' + this.textContent.trim();
      });
    });
  }
}


function initializeQuantitySelector() {
  const quantityInput = document.querySelector('.quantity-value');
  const decreaseBtn = document.querySelector('.btn-quantity.decrease');
  const increaseBtn = document.querySelector('.btn-quantity.increase');
  
  if (quantityInput && decreaseBtn && increaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
    
    quantityInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value === '' || parseInt(this.value) < 1) {
        this.value = 1;
      }
    });
  }
}


function initializeAddToCart() {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const buyNowBtn = document.querySelector('.buy-now-btn');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const productTitle = document.querySelector('.product-title').textContent;
      const quantity = parseInt(document.querySelector('.quantity-value').value) || 1;
      
      showNotification(`Added ${quantity} × ${productTitle} to cart`, 'success');
      
      const cartCountEl = document.querySelector('.cart-count');
      if (cartCountEl) {
        const currentCount = parseInt(cartCountEl.textContent) || 0;
        cartCountEl.textContent = currentCount + quantity;
      }
    });
  }
  
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      const productTitle = document.querySelector('.product-title').textContent;
      const quantity = parseInt(document.querySelector('.quantity-value').value) || 1;
      
      showNotification(`Proceeding to checkout with ${quantity} × ${productTitle}`, 'info');
    });
  }
}


function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type} position-fixed`;
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.padding = '15px 20px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  notification.style.transition = 'all 0.3s ease';
  notification.style.transform = 'translateY(-10px)';
  notification.style.opacity = '0';
  
  if (type === 'success') {
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#F44336';
    notification.style.color = 'white';
  } else if (type === 'info') {
    notification.style.backgroundColor = '#2196F3';
    notification.style.color = 'white';
  }
  
  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <div class="me-3">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      </div>
      <div>${message}</div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 10);
  
  setTimeout(() => {
    notification.style.transform = 'translateY(-10px)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
} 