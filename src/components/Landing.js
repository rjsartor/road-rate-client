import React from 'react';
import LandingNav from './LandingNav';
import About from './AboutPage.js';
import '../styles/pages/landing.css';
import { SearchByPlate } from './common/SearchByPlate';
import ReviewList from './common/ReviewList';
import { useReviews } from '../hooks/use-reviews';

export const LandingPage = () => {
  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');

  return (
      <main className="home">
        <section className="landing-top">
          <LandingNav />
          <article className='landing-content'>
            <article className='landing-text'>
              <h1>RoadRate</h1>
              <p id="catch-phrase">choose rate, not rage</p>
              <p id='responsibly'>Responsibly rate drivers.</p>
              <p id='anonymous'>100% anonymous.</p>
              <article className="about">
                <About />
              </article>
            </article>
          </article>
        </section>
        <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
        <ReviewList reviews={reviews} canClickPlate={true} />
      </main>
  );
};

export default LandingPage;
