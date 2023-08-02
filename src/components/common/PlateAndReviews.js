import React, { useState, useEffect } from 'react';
import MaterialIcon from 'material-icons-react';
import Spinner from 'react-spinkit';
import { getElapsedTime } from '../../utils/time.util';
import OwnerResponseForm from '../owner-response-form';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const PlateAndReviews = ({ fetchPlateUrl, fetchReviewsUrl }) => {
    const [plate, setPlate] = useState(null);
    const [reviews, setReviews] = useState(null);

    const location = useLocation();

    const isMyPlate = location.pathname.includes('my-plates')

    const [ submitResponse, setSubmitResponse] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetchPlateUrl', fetchPlateUrl)
        const plateResponse = await fetch(`${API_BASE_URL}/${fetchPlateUrl}`);
        console.log('plateData', plateResponse);
        const plateData = await plateResponse.json();
        setPlate(plateData);

        const reviewResponse = await fetch(`${API_BASE_URL}/${fetchReviewsUrl}`);
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchPlateUrl, fetchReviewsUrl]);

    // const fetchPlate = async () => {
    //     /* ==== extract plateId from url ==== */
    //     const address = document.location.href;
    //     const url = new URL(address);
    //     const plateId = url.pathname.split('/').pop();
    //     // const plateId = address.substring((address.indexOf('d')+ 2), address.length);
    //     // setPlateId(plateId)

    //     console.log(`${API_BASE_URL}/reviews/plate/${plateId}`)
    //     console.log(fetchReviewsUrl)
        
    //     /* ==== fetch plate info using plateId ==== */
    //     // let plateUrl = `${API_BASE_URL}/plates/${plateId}`;
    //     const res = await fetch(fetchPlateUrl);
    //     const plate  = await res.json();
    //     setPlate(plate)

    //     /* ==== fetch reviews using plateId ==== */
    //     let reviewURL = `${API_BASE_URL}/reviews/plate/${plateId}`;
    //     const response = await fetch(fetchReviewsUrl);
    //     const reviews  = await response.json();
    //     setReviews(reviews)
    //     return reviews
    // }

    // useEffect(() => {
    //   fetchPlate()
    // }, []);

  if (plate === null || reviews === null) {
    return (
      <section className='plate-div'>
        <article className='spinner' style={{ margin: '0 auto' }}>
          <Spinner name='line-spin-fade-loader' color='green' />
        </article>
      </section>
    );
  }

  const karmaStyling =
    plate.karma > 0
      ? 'public-plate-wrapper-positive'
      : plate.karma < 0
      ? 'public-plate-wrapper-negative'
      : 'public-plate-wrapper-neutral';

  const reviewItems = reviews.map((review, index) => {
    const ratingIcon = review.isPositive === 'true' ? (
      <MaterialIcon icon='thumb_up' />
    ) : (
      <MaterialIcon icon='thumb_down' />
    );

    console.log('review', review)

    const { elapsedTime, dateString } = getElapsedTime(review.createdAt);
    console.log('elsapsred time', elapsedTime);

    let ownerComment;
    let responseButton;
    let responseForm;

        console.log('review', review)
        console.log('isMyPlate', isMyPlate)

    if (isMyPlate) {
        if (review.ownerResponse) {
            ownerComment = <p>Your Response: {review.ownerResponse}</p>
          } else {
            responseButton = <button id="owner-response-btn" onClick={() => {
              localStorage.setItem('submitResponse', review._id);
              setSubmitResponse(review._id)
            }       
          }>Leave a response</button>
        }
    
        if (localStorage.submitResponse === review._id) {
            responseForm = <OwnerResponseForm reviewId={review._id} />
            responseButton = <button id="owner-response-btn" onClick={() => {
                localStorage.removeItem('submitResponse')
                setSubmitResponse('')}
            }>Cancel</button>
        } 
    }
   
    return (
      <li className='review-item' key={index} id={review._id} tabIndex='0'>
        <article className='review-header'>
          <article className='review-title'>
            <p className='plate-name'>{review.plateNumber}</p>
            <p className='elapsed-time'>{elapsedTime}</p>
          </article>
          <article className='review-rating'>
            <p className='rating'>{ratingIcon}</p>
          </article>
        </article>
        <p className='message'>{review.message}</p>
        <article className='owner-comment'></article>
        <p className='review-date'>{dateString}</p>
        {responseButton}
        {responseForm}
        {ownerComment}
          {/* <p className='review-date'>{dateString}</p> */}
      </li>
    );
  });

  return (
    <section className='plate-div'>
      <article className={karmaStyling}>
        <article className='plate-content'>
          <article className='plate-title'>
            <h2 id={plate.plateId}>{plate.plateNumber}</h2>
          </article>
          <article className='plate-info'>
            <p>State: {plate.plateState}</p>
            <p>Karma: {plate.karma}</p>
          </article>
        </article>
      </article>
      <ul className='review-list'>{reviewItems}</ul>
      
    </section>
  );
}

export default PlateAndReviews;
