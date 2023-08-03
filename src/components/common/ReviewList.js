import React from 'react';
import { Review } from './Review';
import '../styles/reviews/review-list.css';

export const ReviewList = ({ reviews, canClickPlate = false, userPlate = false }) => {
  if (!reviews || !reviews.length) return <p>Loading reviews...</p>;
  return (
    <ul  className='review-list'>
      {reviews.map((r) => {
        return <Review 
          key={r._id} 
          review={r} 
          canClickPlate={canClickPlate} 
          userPlate={userPlate}
        />
      })}
    </ul>
  )
}

export default ReviewList;