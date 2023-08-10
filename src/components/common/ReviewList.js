import React from 'react';
import { Review } from './Review';
import { Spinner } from 'reactstrap';
import '../../styles/reviews/review-list.css';


export const ReviewList = ({ reviews, canClickPlate = false, userPlate = false }) => {
  
  if (!reviews) return <Spinner />;
  if (!reviews.length) return <p>No reviews yet for this plate</p>;
  
  return (
    <ul className='review-list'>
      {reviews.map((r) => {
        return <Review
          key={r._id}
          review={r}
          canClickPlate={canClickPlate}
          userPlate={userPlate}
        />;
      })}
    </ul>
  );
};

export default ReviewList;
