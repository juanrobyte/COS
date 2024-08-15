import React from 'react';
import '../styles/Rating.css'; // Importar el archivo CSS

const Rating = ({ rating, numReviews }) => {
  // Lógica para calcular las estrellas llenas y parciales
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const hasHalfStar = decimalPart >= 0.5;
 
  return (
    <div className="rating">
      <span className="rating-number">{rating}</span>
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star full"></span>
        ))}
        {hasHalfStar && <span className="star half"></span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i + fullStars + (hasHalfStar ? 1 : 0)} className="star"></span>
        ))}
      </div>
      <span className="reviews">{numReviews} Reviews</span>
    </div>
  );
};

export default Rating;