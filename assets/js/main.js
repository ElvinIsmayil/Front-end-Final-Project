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

