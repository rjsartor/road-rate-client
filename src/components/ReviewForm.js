import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import '../styles/forms/review-form.css';
import { StateSelect } from './StateSelect';

export const ReviewForm = (props) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [plateState, setPlateState] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');

  const userPlates = props.plates.map(plate => {
    return {
      userPlateNumber: plate.plateNumber,
      userPlateState: plate.plateState
    };
  });

  if (plateState && plateNumber) {
    userPlates.forEach(plate => {
      if (plate.userPlateNumber === plateNumber && plate.userPlateState === plateState) {
        setInvalidMessage('You cannot review your own plate');
        setPlateState('');
      }
    });
  };

  const handleStateSelect = (e) => {
    setPlateState(e.target.value); 
    setInvalidMessage(''); 
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const username = localStorage.user;
    const reviewerId = localStorage.userId;

    setPlateNumber(plateNumber.toUpperCase());
    setMessage(message);
    setPlateState(plateState);
    setRating(rating);

    return fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        plateNumber: plateNumber.toUpperCase(),
        rating,
        message,
        username,
        reviewerId,
        plateState
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('review data', data);
        return data;
      })
      .then(() => setSubmitted(true))
      .then(() => {
        setPlateNumber('');
        setMessage('');
        setPlateState('');
        setRating('');
      })
      .catch(err => {
      // alert("We're sorry. Something went wrong.")
        console.error(err);
      });
  };

  let successMessage;
  if (submitted) {
    successMessage = <p>Thanks! Your review was submitted.</p>;
  }

  return (
    <section className='submit-review'>
      <form id='submit-review-form' onSubmit={handleSubmit}>
        <h3>Submit A RoadRating: </h3>
        <label htmlFor='plateId' className="review-label">
          License Plate:
        </label>
        <input
          type='text'
          name='plateId'
          placeholder='X90PL'
          value={plateNumber}
          onChange={(e) => { setPlateNumber(e.target.value); setInvalidMessage(''); }}
          required
          pattern="^[a-zA-Z0-9]{1,8}$"
          title="Plate number should be between 1 to 8 characters"
        />

        <label htmlFor='rating' className="review-label">Rating:  </label>
        <select
          id='rating'
          className='browser-default'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          name='rating'
        >
          <option value=''>Select </option>
          <option value="true">Good</option>
          <option value="false">Bad</option>
        </select>

        <label
          htmlFor='plateState'
          className="review-label"
        >
          State:
        </label>
        <StateSelect setState={handleStateSelect} /> 
        <label
          htmlFor='review-message-input'
          className="review-label"
        >
          Message:
        </label>
        <textarea
          id='review-message-input'
          type='text'
          name='message'
          placeholder='Be honest and objective!'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
        type="submit"
        className="review-submit"
        disabled={plateNumber === '' || plateState === '' || !rating || message === '' }
        >
          Submit Review
        </button>
      </form>
      {invalidMessage}
      {successMessage}
    </section>
  );
};

export default ReviewForm;
