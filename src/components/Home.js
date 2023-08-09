import React, { useState } from 'react';
import ReviewForm from './forms/ReviewForm';
import PagesNav from './PagesNav';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import '../styles/pages/dashboard.css';
import ReviewList from './common/ReviewList';
import { useReviews } from '../hooks/use-reviews';
import { SearchByPlate } from './common/SearchByPlate';

export const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');

  const [submitReview, setSubmitReview] = useState(false);

  const { isLoading } = useAuthTasks();
  if (isLoading) return <p>Authenticating...</p>;

  return (
    <main className="dashboard">
      <PagesNav />
      <section className="dashboard-greeting">
        <p className="greeting-text">hey there, {user?.username}</p>
      </section>
      <button
        className="add-review"
        onClick={() => setSubmitReview(prev => !prev)}
      >
        <span className="new-review">New Review</span>
      </button>
      {submitReview && <ReviewForm userId={user.id} />}
      <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
      <ReviewList reviews={reviews} canClickPlate={true} />
    </main>
  );
};

export default Home;
