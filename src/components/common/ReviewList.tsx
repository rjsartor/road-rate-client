import React, { FC } from 'react';
import Review from './Review';
import { Spinner } from 'reactstrap';
import '../../styles/reviews/review-list.css';
import { ReviewType } from '../../types/reviews.types';

interface ReviewListProps {
  reviews: ReviewType[] | null;
  canClickPlate?: boolean;
  userPlate?: boolean | null;
  showPlate?: boolean | null;
}

export const ReviewList: FC<ReviewListProps> = ({ reviews, canClickPlate = false, userPlate = false, showPlate = true }) => {
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
          showPlate={showPlate}
        />;
      })}
    </ul>
  );
};

export default ReviewList;
