import React, { FC, useState } from 'react';
import ReviewForm from './forms/ReviewForm';
import PagesNav from './PagesNav';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import ReviewList from './common/ReviewList';
import { SearchByPlate } from './common/SearchByPlate';
import '../styles/pages/dashboard.css';
import { UserType } from '../types/auth.types';
import useReviews from '../hooks/use-reviews';

const Home: FC = () => {
  const userJSON = localStorage.getItem('user');
  const user: UserType | null = userJSON ? JSON.parse(userJSON) : null;

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
      {submitReview && <ReviewForm userId={user?.id || ''} />}
      <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
      <ReviewList reviews={reviews} canClickPlate={true} />
    </main>
  );
};

export default Home;
