import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';

export const OwnerResponseForm = (props) => {
  const [ownerResponse, setOwnerResponse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [hideForm, setHideForm] = useState(false);

  let formBody;

  if (hideForm) {
    formBody = '';
  }

  const { reviewId } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    return fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        ownerResponse
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSuccessMessage(true);
        localStorage.removeItem('submitResponse');
        props.fetchReviews();
        return data;
      })
      .catch(err => {
        // alert("We're sorry. Something went wrong.")
        console.log(err);
      });
  };

  if (successMessage) {
    formBody = <p>Thanks. Your response was saved.</p>;
    // return <Redirect to='/my-plate' />
  } else {
    formBody = (
        <form id="owner-response-form" onSubmit={handleSubmit}>
          <fieldset id='owner-submit-form'></fieldset>
          <legend>Leave a Response</legend>
          <label
            htmlFor="submit-response"
            className="owner-response-label"
            aria-label="owner-response-form"
          >
            <textarea
              value={ownerResponse}
              onChange={e => setOwnerResponse(e.target.value)}
              type="textbox"
              id="owner-response"
              name="owner-response"
              placeholder="Your response"
            />
          </label>

          <button id="submit-owner-response-btn">
            Submit
          </button>
        </form>);
  }

  return (
    <section className="submit-response">
      {formBody}
    </section>
  );
};

export default OwnerResponseForm;
