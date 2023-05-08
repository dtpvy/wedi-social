import React from 'react';
import PropTypes from 'prop-types';

const RatingDisplay = ({ rating, maxRating, numRatings }: any) => {
  // Calculate the number of full stars to display
  const fullStars = Math.floor(rating);

  // Calculate the percentage of the last star to display
  const lastStarPercentage = (rating - fullStars) * 100;

  return (
    <div className="rating-display">
      <div className="rating-stars flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} className="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 20 20">
            <path d="M10 1l2.928 5.672L19 7.218l-4.218 4.108.996 5.793L10 16.25l-5.778 3.069.996-5.793L1 7.218l6.072-.546L10 1z" />
          </svg>
        ))}
        {lastStarPercentage > 0 && lastStarPercentage < 100 && (
          <svg className="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${lastStarPercentage}%`} style={{ stopColor: '#FFC107' }} />
                <stop offset={`${lastStarPercentage}%`} style={{ stopColor: '#E2E8F0' }} />
              </linearGradient>
            </defs>
            <path
              d="M10 1l2.928 5.672L19 7.218l-4.218 4.108.996 5.793L10 16.25l-5.778 3.069.996-5.793L1 7.218l6.072-.546L10 1z"
              fill="url(#grad1)"
            />
          </svg>
        )}
        {[...Array(maxRating - (fullStars + (lastStarPercentage > 0 ? 1 : 0)))].map((_, i) => (
          <svg key={i} className="w-6 h-6 fill-current text-gray-400" viewBox="0 0 20 20">
            <path d="M10 1l2.928 5.672L19 7.218l-4.218 4.108.996 5.793L10 16.25l-5.778 3.069.996-5.793L1 7.218l6.072-.546L10 1z" />
          </svg>
        ))}
      </div>
      <div className="rating-text text-gray-600 text-sm mt-1">
        {rating.toFixed(1)} / {maxRating.toFixed(1)} ({numRatings} ratings)
      </div>
    </div>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
  numRatings: PropTypes.number.isRequired,
};

export default RatingDisplay;
