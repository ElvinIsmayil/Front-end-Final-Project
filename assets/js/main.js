document.addEventListener('DOMContentLoaded', function() {
    swiperCarousel();
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

    // Animation on slide change
    swiper.on('slideChangeTransitionStart', function () {
        const allAnimatedTexts = document.querySelectorAll('.animated-text');
        allAnimatedTexts.forEach(text => {
            text.classList.remove('active');  // Reset animations by removing the 'active' class
            void text.offsetWidth;            // Force reflow to restart the animation
        });

        // Apply the 'active' class to the visible slide texts
        setTimeout(() => {
            const activeSlideTexts = document.querySelectorAll('.swiper-slide-active .animated-text');
            activeSlideTexts.forEach(text => text.classList.add('active'));
        }, 100);  // Slight delay to ensure correct DOM update timing
    });
}


