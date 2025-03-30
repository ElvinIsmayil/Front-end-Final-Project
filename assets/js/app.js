import { getAllData } from "./services.js";
import { endpoints} from "./constants.js";

document.addEventListener('DOMContentLoaded', function() {
    getProducts()
});

async function getProducts(){
    try {
        const products = await getAllData(endpoints.products)
        drawCards(products)
    } catch (error) {
        console.log(error);
    }
}

function convertRatingToStars(rating) {
    const roundedRating = Math.round(rating * 2) / 2;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(roundedRating)) {
            stars += '<span class="jdgm-star jdgm--on"></span>';
        } else if (i - 0.5 === roundedRating) {
            stars += '<span class="jdgm-star jdgm--half"></span>';
        } else {
            stars += '<span class="jdgm-star jdgm--off"></span>';
        }
    }
    
    return stars;
}

function drawCards(products) {
    if (!products || !Array.isArray(products)) {
        console.error("Error: products is not an array or is undefined");
        return;
    }

    const newCards = document.getElementById("new-arrival-cards")
    let count = 0;

    products.forEach(product => {
        count++;
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3";
        const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== '';


        const starRating = convertRatingToStars(product.rating);

        if (count>4){
            return;
        }
        else{
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
                            ${starRating}
                        </div>
                    </div>
                </div>
            `;
    
            newCards.appendChild(cardWrapper);

        }

    })

    products.forEach(product => {
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3";

        const hasHoverImage = product.hoverImage && product.hoverImage.trim() !== '';

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
                        ${starRating}
                    </div>
                </div>
            </div>
        `;

        cards.appendChild(cardWrapper);
    });
}