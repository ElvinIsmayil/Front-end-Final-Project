function testimonialSwiper(){
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
      loop: true,
      speed: 600,
      slidesPerView: 2,
      slidesPerGroup: 1, 
      spaceBetween: 30,
      freeMode: false,
      centeredSlides: false,
      loopFillGroupWithBlank: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.testimonialSwiper .swiper-button-next', 
        prevEl: '.testimonialSwiper .swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1, 
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 30,
        }
      },
      a11y: {
        prevSlideMessage: 'Previous testimonial',
        nextSlideMessage: 'Next testimonial',
      }
    });
    
    const swiperContainer = document.querySelector('.testimonialSwiper');
    if (swiperContainer) {
      swiperContainer.addEventListener('mouseenter', function() {
        if (testimonialSwiper && testimonialSwiper.autoplay) {
          testimonialSwiper.autoplay.stop();
        }
      });
      
      swiperContainer.addEventListener('mouseleave', function() {
        if (testimonialSwiper && testimonialSwiper.autoplay) {
          testimonialSwiper.autoplay.start();
        }
      });
    }
    
    return testimonialSwiper;
  }

  export default testimonialSwiper;