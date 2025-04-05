function teamSwiper(){
    if (typeof Swiper !== 'undefined') {
        const teamSwiper = new Swiper('.teamSwiper', {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          grabCursor: true,
          centeredSlides: false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            576: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }
        });
      } else {
        console.error('Swiper is not defined. Make sure to include the Swiper library.');
      }
    };

    export default teamSwiper