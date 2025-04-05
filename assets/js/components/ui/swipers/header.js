/**
 * Sticky Header Function
 * Keeps topbar fixed while making navbar sticky when scrolling
 */
function stickyHeader(){
    const topbar = document.querySelector('.topbar');
    const navbar = document.querySelector('.navbar');
    
    if (!topbar || !navbar) return;
    
    const topbarHeight = topbar.offsetHeight;
    const navbarHeight = navbar.offsetHeight;
    
    // Initial positioning - navbar below topbar
    navbar.style.position = 'absolute';
    navbar.style.top = topbarHeight + 'px';
    
    // Set body padding for the fixed header components
    document.body.style.paddingTop = (topbarHeight + navbarHeight) + 'px';
    
    // Define the scroll position where navbar should become fixed
    const scrollThreshold = topbarHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            // Make navbar fixed at top, above topbar (higher z-index)
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.zIndex = '1031'; // Higher than topbar
        } else {
            // Return navbar to original position below topbar
            navbar.style.position = 'absolute';
            navbar.style.top = topbarHeight + 'px';
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
            navbar.style.zIndex = '1030'; // Lower than topbar
        }
    });
    
    // Update positions on window resize
    window.addEventListener('resize', function() {
        const updatedTopbarHeight = topbar.offsetHeight;
        const updatedNavbarHeight = navbar.offsetHeight;
        
        // If not scrolled, update navbar position
        if (window.scrollY <= scrollThreshold) {
            navbar.style.top = updatedTopbarHeight + 'px';
        }
        
        // Always update the body padding
        document.body.style.paddingTop = (updatedTopbarHeight + updatedNavbarHeight) + 'px';
    });
}

/**
 * Setup navigation link hover effects
 * Ensures consistent hover/active state for all main nav items
 */
function setupNavHoverEffects() {
    const navItems = document.querySelectorAll('.navbar .nav-item');
    
    // Helper to remove active class from all items
    function removeActiveClass() {
        navItems.forEach(item => item.classList.remove('active'));
    }
    
    // Set active state on nav items
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        // On mouse enter, add active class
        item.addEventListener('mouseenter', function() {
            // Don't remove active class from others if it's a dropdown interaction
            const isDropdownOpen = item.querySelector('.dropdown-menu.show');
            if (!isDropdownOpen) {
                removeActiveClass();
                item.classList.add('active');
            }
        });
        
        // Optional: Remove active class when mouse leaves the navbar area
        document.querySelector('.navbar').addEventListener('mouseleave', function() {
            // Only remove active class if no dropdown is open
            const anyDropdownOpen = document.querySelector('.navbar .dropdown-menu.show');
            if (!anyDropdownOpen) {
                removeActiveClass();
            }
        });
    });
}

// Call functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    stickyHeader();
    setupNavHoverEffects();
}); 

export{
    stickyHeader,
    setupNavHoverEffects
}