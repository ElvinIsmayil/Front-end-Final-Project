import { getAllData } from "./services.js";
import { endpoints} from "./constants.js";

document.addEventListener('DOMContentLoaded', function() {
    swiperCarousel()
    getProducts()
    drawCards()
});

function swiperCarousel(){
    const swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
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
    
}

async function getProducts(){
    try {
        const products = await getAllData(endpoints.products)
        drawCards(products)
    } catch (error) {
        console.log(error);
    }
}



function convertRatingToStars(rating) {
    const fullStar = '★';  // Full star character
    const emptyStar = '☆'; // Empty star character
    const halfStar = '⯪';  // Half star character, or use an icon if preferred

    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += fullStar;  // Full star for a full rating
        } else if (i <= rating) {
            stars += halfStar;  // Half star if the rating is in between
        } else {
            stars += emptyStar;  // Empty star for remaining
        }
    }
    return stars;
}

function drawCards(products) {
    const cards = document.getElementById("cards");

    products.forEach(product => {
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3";

        const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== '';

        // Convert rating to stars (assuming product has a 'rating' property)
        const starRating = convertRatingToStars(product.rating);

        cardWrapper.innerHTML = `
            <div class="card border-0">
                <div class="card-img-container position-relative">
                    <img src="${product.image}" class="card-img-top primary-img" alt="${product.name}">
                    ${hasHoverImage ? `<img src="${product.hoverImage}" class="card-img-top hover-img" alt="${product.name} hover">` : ''}
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <span class="text-muted">m. ${product.price}</span>
                    <div class="rating">
                        ${starRating} <!-- Insert star rating -->
                    </div>
                </div>
            </div>
        `;

        cards.appendChild(cardWrapper);
    });
}
