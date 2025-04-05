
export function loadHeader() {
  let headerPlaceholder = document.getElementById('header-placeholder');
  
  
  if (!headerPlaceholder) {
    headerPlaceholder = document.createElement('div');
    headerPlaceholder.id = 'header-placeholder';
    
    
    if (document.body.firstChild) {
      document.body.insertBefore(headerPlaceholder, document.body.firstChild);
    } else {
      document.body.appendChild(headerPlaceholder);
    }
  }
  
  
  const headerHTML = `
    <header class="site-header">
      <section class="topbar">
        <div class="bg-black py-3 fs-5">
          <div class="container-fluid px-md-5">
            <div class="row align-items-center">
              <div class="col-md-4 d-none d-md-block">
                <a
                  href="tel:+0123456789"
                  class="text-white text-decoration-none me-3 small"
                >
                  <i class="fa-thin fa-phone-volume"></i> +0123456789
                </a>
                <a
                  href="mailto:Digizen@domain.com"
                  class="text-white text-decoration-none small"
                >
                  <i class="fa-light fa-envelope me-1"></i> Digizen@domain.com
                </a>
              </div>

              <div
                class="col-6 col-md-4 text-center text-white small free-delivery-notice"
              >
                Free Delivery on <strong>orders</strong> over $260
              </div>

              <div
                class="col-6 col-md-4 d-flex justify-content-end align-items-center"
              >
                <div class="d-flex social-icons text-white">
                  <a href="#" class="text-white facebook">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" class="text-white ms-2 instagram">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" class="text-white ms-2 twitter">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" class="text-white ms-2 pinterest">
                    <i class="fa-brands fa-pinterest-p"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav
        class="navbar navbar-expand-lg bg-body-tertiary bg-white py-3"
      >
        <div class="container-fluid px-md-5">
          <a href="./index.html" class="navbar-brand">
            <img src="./assets/images/logo.png" alt="Rivon" class="img-fluid" />
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar2"
            aria-controls="navbar2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbar2">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item dropdown mx-1">
                <a
                  class="nav-link dropdown-toggle px-2 px-md-3 fw-bold text-black"
                  href="./index.html"
                  id="homeDropdown"
                >
                  Home <i class="fas fa-chevron-down ms-1 small"></i>
                </a>
                <div class="dropdown-menu fade-down">
                  <a class="dropdown-item" href="#">Home Style 1</a>
                  <a class="dropdown-item" href="#">Home Style 2</a>
                  <a class="dropdown-item" href="#">Home Style 3</a>
                </div>
              </li>

              <li class="nav-item dropdown mx-1">
                <a
                  class="nav-link dropdown-toggle px-2 px-md-3 fw-bold text-black"
                  href="#"
                  id="shopDropdown"
                >
                  Shop <i class="fas fa-chevron-down ms-1 small"></i>
                </a>
                <div class="dropdown-menu fade-down">
                  <a class="dropdown-item" href="./all-products.html">All Products</a>
                  <a class="dropdown-item" href="#">Product Categories</a>
                  <a class="dropdown-item" href="#">Product Details</a>
                </div>
              </li>

              <li class="nav-item dropdown mx-1">
                <a
                  class="nav-link dropdown-toggle px-2 px-md-3 fw-bold text-black"
                  href="#"
                  id="pagesDropdown"
                >
                  Pages <i class="fas fa-chevron-down ms-1 small"></i>
                </a>
                <div class="dropdown-menu fade-down">
                  <a class="dropdown-item" href="./about.html">About Us</a>
                  <a class="dropdown-item" href="./cart.html">Cart</a>
                  <a class="dropdown-item" href="./checkout.html">Checkout</a>
                  <a class="dropdown-item" href="./wishlist.html">Wishlist</a>
                  <a class="dropdown-item" href="#">Contact Us</a>
                </div>
              </li>

              <li class="nav-item dropdown mx-1">
                <a
                  class="nav-link dropdown-toggle px-2 px-md-3 fw-bold text-black"
                  href="#"
                  id="blogDropdown"
                >
                  Blog <i class="fas fa-chevron-down ms-1 small"></i>
                </a>
                <div class="dropdown-menu fade-down">
                  <a class="dropdown-item" href="#">Blog Grid</a>
                  <a class="dropdown-item" href="#">Blog List</a>
                  <a class="dropdown-item" href="#">Blog Details</a>
                </div>
              </li>

              <li class="nav-item mx-1">
                <a
                  class="nav-link px-2 px-md-3 fw-bold text-black"
                  href="./contact.html"
                  >Contact</a
                >
              </li>
            </ul>

            <div class="d-flex align-items-center mt-3 mt-lg-0 shop-icons">
              <a href="#" class="text-dark ms-2 ms-md-3">
                <i class="fa-light fa-magnifying-glass fs-5"></i>
              </a>
              <a
                href="#"
                class="text-dark ms-2 ms-md-3 position-relative"
                id="wishlistToggle"
                data-bs-toggle="offcanvas"
                data-bs-target="#wishlistOffcanvas"
                aria-controls="wishlistOffcanvas"
              >
                <i class="fa-light fa-heart fs-5"></i>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark wishlist-count"
                  style="display: none;"
                  >0</span
                >
              </a>
              <a
                href="#"
                class="text-dark ms-2 ms-md-3 position-relative"
                id="cartToggle"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
                aria-controls="cartOffcanvas"
              >
                <i class="fa-thin fa-bag-shopping fs-5"></i>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark cart-count"
                  style="display: none;"
                  >0</span
                >
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
  
  
  headerPlaceholder.innerHTML = headerHTML;
  
  
  setupHeaderFunctionality();
}



function setupHeaderFunctionality() {
  
  setupStickyHeader();
  
  
  setupDropdowns();
}


function setupStickyHeader() {
  const topbar = document.querySelector('.topbar');
  const navbar = document.querySelector('.navbar');
  
  if (!topbar || !navbar) return;
  
  const topbarHeight = topbar.offsetHeight;
  const navbarHeight = navbar.offsetHeight;
  
  
  navbar.style.position = 'absolute';
  navbar.style.top = topbarHeight + 'px';
  
  
  document.body.style.paddingTop = (topbarHeight + navbarHeight) + 'px';
  
  
  const scrollThreshold = topbarHeight;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      
      navbar.style.position = 'fixed';
      navbar.style.top = '0';
      navbar.classList.add('scrolled');
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      navbar.style.zIndex = '1031'; 
    } else {
      
      navbar.style.position = 'absolute';
      navbar.style.top = topbarHeight + 'px';
      navbar.classList.remove('scrolled');
      navbar.style.boxShadow = 'none';
      navbar.style.zIndex = '1030'; 
    }
  });
}


function setupDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentElement;
      const menu = parent.querySelector('.dropdown-menu');
      
      
      document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
        if (openMenu !== menu) {
          openMenu.classList.remove('show');
        }
      });
      
      
      menu.classList.toggle('show');
    });
  });
  
  
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
} 