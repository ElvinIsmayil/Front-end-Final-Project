function stickyHeader(){
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
    
    
    window.addEventListener('resize', function() {
        const updatedTopbarHeight = topbar.offsetHeight;
        const updatedNavbarHeight = navbar.offsetHeight;
        
        
        if (window.scrollY <= scrollThreshold) {
            navbar.style.top = updatedTopbarHeight + 'px';
        }
        
        
        document.body.style.paddingTop = (updatedTopbarHeight + updatedNavbarHeight) + 'px';
    });
}

function setupNavHoverEffects() {
    const navItems = document.querySelectorAll('.navbar .nav-item');
    
    
    function removeActiveClass() {
        navItems.forEach(item => item.classList.remove('active'));
    }
    
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        
        item.addEventListener('mouseenter', function() {
            
            const isDropdownOpen = item.querySelector('.dropdown-menu.show');
            if (!isDropdownOpen) {
                removeActiveClass();
                item.classList.add('active');
            }
        });
        
        
        document.querySelector('.navbar').addEventListener('mouseleave', function() {
            
            const anyDropdownOpen = document.querySelector('.navbar .dropdown-menu.show');
            if (!anyDropdownOpen) {
                removeActiveClass();
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    stickyHeader();
    setupNavHoverEffects();
}); 

export{
    stickyHeader,
    setupNavHoverEffects
}