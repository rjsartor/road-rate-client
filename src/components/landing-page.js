import React from 'react';
import LandingNav from './landing-nav';
import ReviewList from './review-list';
import About from './about.js';
import '../styles/pages/landing.css';

export const LandingPage = () => {

    // const accessToken = localStorage.getItem('accessToken');
    // const navigate = useNavigate();

    // console.log('accessToken', accessToken)

    // if (accessToken) {
    //   console.log('should nav')
    //   navigate('/dashboard');
    // }

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
