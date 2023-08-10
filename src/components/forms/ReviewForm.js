import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import '../../styles/forms/review-form.css';
import { StateSelect } from '../common/StateSelect';
import { usePlates } from '../../hooks/use-plates';

const ReviewForm = ({ userId, initialFormData = {} }) => {
  const { plates: userPlates } = usePlates(userId);

  const [formData, setFormData] = useState({
    plateNumber: '',
    rating: '',
    message: '',
    plateState: '',
    ...initialFormData,
  });

  const [submitted, setSubmitted] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');

  const validPlates = userPlates.map(({ plateNumber, plateState }) => ({ userPlateNumber: plateNumber, userPlateState: plateState }));

  useEffect(() => {
    if (formData.plateState && formData.plateNumber) {
      const invalidPlate = validPlates.find(plate => plate.userPlateNumber === formData.plateNumber && plate.userPlateState === formData.plateState);
      if (invalidPlate) {
        setInvalidMessage('You cannot review your own plate');
        setFormData(prevFormData => ({ ...prevFormData, plateState: '' }));
      }
    }
  }, [formData.plateState, formData.plateNumber]);

  const handleStateSelect = state => {
    setFormData(prevFormData => ({ ...prevFormData, plateState: state }));
    setInvalidMessage('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.user);

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.authToken}`,
        },
        body: JSON.stringify({
          ...formData,
          plateNumber: formData.plateNumber.toUpperCase(),
          username: user.username,
          reviewerId: user.id,
        }),
      });

      const data = await response.json();
      setSubmitted(true);
      setFormData({
        plateNumber: '',
        rating: '',
        message: '',
        plateState: '',
      });
    } catch (error) {
      console.error(error);
      // alert("We're sorry. Something went wrong.")
    }
  };

  const successMessage = submitted && <p>Thanks! Your review was submitted.</p>;

  return (
    <section className='submit-review'>
      <form id='submit-review-form'>
        <h3>Submit A RoadRating:</h3>
        <label htmlFor='plateNumber'>License Plate:</label>
        <input
          type='text'
          id='plateNumber'
          name='plateNumber'
          placeholder='X90PL'
          value={formData.plateNumber}
          onChange={e => setFormData({ ...formData, plateNumber: e.target.value.toUpperCase() })}
          required
          pattern='^[a-zA-Z0-9]{1,8}$'
          title='Plate number should be between 1 to 8 characters'
        />

        <label htmlFor='rating'>Rating:</label>
        <select
          id='rating'
          className='browser-default'
          value={formData.rating}
          onChange={e => setFormData({ ...formData, rating: e.target.value })}
        >
          <option value=''>Select</option>
          <option value='true'>Good</option>
          <option value='false'>Bad</option>
        </select>

        <label htmlFor='plateState'>State:</label>
        <StateSelect state={formData.plateState} setState={handleStateSelect} />

        <label htmlFor='message'>Message:</label>
        <textarea
          id='review-message-input'
          type='text'
          name='message'
          placeholder='Be honest and objective!'
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          type='submit'
          className='review-submit'
          disabled={!formData.plateNumber || !formData.plateState || !formData.rating || !formData.message}
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
