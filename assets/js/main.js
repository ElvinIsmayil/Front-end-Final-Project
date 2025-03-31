document.addEventListener('DOMContentLoaded', function() {
    swiperCarousel();
    stickyHeader()
});

function swiperCarousel() {
    const swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        },
    });

    swiper.on('slideChangeTransitionStart', function () {
        const allAnimatedTexts = document.querySelectorAll('.animated-text');
        allAnimatedTexts.forEach(text => {
            text.classList.remove('active');  
            void text.offsetWidth;            
        });

        setTimeout(() => {
            const activeSlideTexts = document.querySelectorAll('.swiper-slide-active .animated-text');
            activeSlideTexts.forEach(text => text.classList.add('active'));
        }, 100);  
    });
}

 function stickyHeader(){
    const topbar = document.querySelector('.topbar');
    const navbar = document.querySelector('.navbar');
    
    const topbarHeight = topbar.offsetHeight;
    const navbarHeight = navbar.offsetHeight;
    
    navbar.style.top = topbarHeight + 'px';
    
    document.body.style.paddingTop = (topbarHeight + navbarHeight) + 'px';
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    });
    
    window.addEventListener('resize', function() {
        const updatedTopbarHeight = topbar.offsetHeight;
        const updatedNavbarHeight = navbar.offsetHeight;
        
        navbar.style.top = updatedTopbarHeight + 'px';
        document.body.style.paddingTop = (updatedTopbarHeight + updatedNavbarHeight) + 'px';
    });
};
;