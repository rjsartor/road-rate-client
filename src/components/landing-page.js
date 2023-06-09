import React from 'react';
import { Redirect, useNavigation } from 'react-router-dom';
import LandingNav from './landing-nav';
import ReviewList from './review-list';
import About from './about.js';
import '../styles/pages/landing.css';
import { useAuth0 } from "@auth0/auth0-react";

export const LandingPage = (props) => {
  
    const { isAuthenticated } = useAuth0;
    const navigate = useNavigation();

    if (isAuthenticated) navigate('/dashboard');

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
        <ReviewList />
      </main>
    );
}

export default LandingPage;
