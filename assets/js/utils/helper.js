function convertRatingToStars(rating) {
    const roundedRating = Math.round(rating * 2) / 2;
    let stars = "";
  
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(roundedRating)) {
        stars += '<i class="fas fa-star text-warning"></i>';
      } else if (i - 0.5 === roundedRating) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
      } else {
        stars += '<i class="far fa-star text-warning"></i>';
      }
    }
  
    return stars;
  }



export{
    convertRatingToStars
}

