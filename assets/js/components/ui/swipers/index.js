import swiperCarousel from "./heroSwiper.js";
import instagramSwiper from "./instagramSwiper.js";
import testimonialSwiper from "./testimonialSwiper.js";
import teamSwiper from "./teamSwiper.js";
import { stickyHeader,setupNavHoverEffects } from "./header.js";

document.addEventListener('DOMContentLoaded', function(){
    try {
        swiperCarousel();
    } catch (error) {
        console.error("Hero swiper error:", error);
    }
    
    try {
        instagramSwiper();
    } catch (error) {
        console.error("Instagram swiper error:", error);
    }
    
    try {
        testimonialSwiper();
    } catch (error) {
        console.error("Testimonial swiper error:", error);
    }
    
    try {
        teamSwiper();
    } catch (error) {
        console.error("Team swiper error:", error);
    }

    try {
        stickyHeader();
    } catch (error) {
        console.error("Team swiper error:", error);
    }

    try {
        setupNavHoverEffects();
    } catch (error) {
        console.error("Team swiper error:", error);
    }
});

