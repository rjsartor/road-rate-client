import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import PagesNav from './PagesNav';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import { usePlates } from '../hooks/use-plates';
import '../styles/pages/dashboard.css';
import ReviewList from './common/ReviewList';
import { useReviews } from '../hooks/use-reviews';
import { SearchByPlate } from './common/SearchByPlate';

export const Dashboard = () => {
  const { isLoading, userInfo } = useAuthTasks();
  const { plates } = usePlates(userInfo?.id);
  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');

  const [submitReview, setSubmitReview] = useState(false);

  if (isLoading) return <p>Authenticating...</p>;

  return (
    <main className="dashboard">
      <PagesNav />
      <section className="dashboard-greeting">
        <p className="greeting-text">hey there, {userInfo?.username}</p>
      </section>
      <button
        className="add-review"
        onClick={() => setSubmitReview(prev => !prev)}
      >
        <span className="new-review">New Review</span>
      </button>
      {submitReview && <ReviewForm plates={plates} />}
      <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
      <ReviewList reviews={reviews} canClickPlate={true} />
    </main>
  );
};

export default Dashboard;
