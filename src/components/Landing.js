import React from 'react';
import About from './About.js';
import { SearchByPlate } from './common/SearchByPlate';
import ReviewList from './common/ReviewList';
import { useReviews } from '../hooks/use-reviews';
import '../styles/pages/landing.css';
import '../styles/navbars/landing-nav.css';

export const LandingPage = () => {
  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');

  return (
      <main className="home">
        <section className="landing-top">
          <div className="navbar">
            <ul className="nav-list">
                <li className="nav-item"></li>
                <li className="nav-item">
                    <button className="add-review" onClick={() => loginWithRedirect()}>Login</button>
                </li>
            </ul>
          </div>
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
