import React, { FC } from 'react';
import PagesNav from './PagesNav';
import useReviews from '../hooks/use-reviews';
import ReviewList from './common/ReviewList';
import '../styles/reviews/my-reviews.css';
import { SearchByPlate } from './common/SearchByPlate';

const MyReviews: FC = () => {
  const userId: string = localStorage.userId;
  
  const { reviews, plateFilter, setPlateFilter } = useReviews(`reviews/${userId}`);

  return (
    <section className="my-reviews">
      <PagesNav />
      <article className='my-reviews-content'>
        <h2>My Reviews</h2>
        <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
        <ReviewList reviews={reviews} canClickPlate={true} />
      </article>
    </section>
  );
};

export default MyReviews;
