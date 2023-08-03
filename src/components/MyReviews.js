import React, { useState }  from 'react'; 
import PagesNav from './PagesNav';
import { useReviews } from '../hooks/use-reviews';
import ReviewList from './common/ReviewList';
import '../styles/reviews/my-reviews.css';

export const MyReviews = () => {
  const [ searchInput, setSearchInput ] = useState("");
  const { reviews } = useReviews(`reviews/${localStorage.userId}`);
  
  return (
    <section className="my-reviews">
      <PagesNav />
      <article className='my-reviews-content'>
          <h2>My Reviews</h2>
        <article className="search-section">
          <fieldset id="review-search">
            <legend>Search By License Plate</legend>
            <form 
              id="search-form"
              className="search-form"
            >
              <article className="input-wrapper">
                <label 
                  htmlFor="search"
                  className="search-label"
                  aria-label="search-form"
                >
                <input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  type="search"
                  id="search"
                  name="search"
                  className="search-input"
                  placeholder="2073WE..."
                />
                </label>
              </article>
            </form>
          </fieldset>
        </article>
        <ReviewList reviews={reviews} canClickPlate={true} />
      </article>
    </section>

  );
};

export default MyReviews;
