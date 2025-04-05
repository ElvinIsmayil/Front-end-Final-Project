function instagramSwiper(){
    const instagramSwiper = new Swiper('.instagram-swiper', {
      slidesPerView: 1,
      spaceBetween: 15,
      loop: true,
      grabCursor: true,
      speed: 600,
      observer: false,
      observeParents: false,
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        }
      },
      navigation: {
        nextEl: '.instagram-swiper .swiper-button-next',
        prevEl: '.instagram-swiper .swiper-button-prev',
      }
    });
    
    return instagramSwiper;
  }

  export default instagramSwiper;