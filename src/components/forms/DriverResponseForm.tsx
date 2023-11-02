import React, { useState, FC } from 'react';

const API_BASE_URL = '../../config';

interface OwnerResponseFormProps {
  reviewId: string;
  fetchReviews: () => void;
}

const OwnerResponseForm: FC<OwnerResponseFormProps> = ({ reviewId, fetchReviews }) => {
  const [ownerResponse, setOwnerResponse] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [hideForm, setHideForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.authToken}`
        },
        body: JSON.stringify({
          ownerResponse
        })
      });

      if (response.ok) {
        setSuccessMessage(true);
        localStorage.removeItem('submitResponse');
        fetchReviews();
      } else {
        console.error('Response error:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  let formBody: JSX.Element | null = null;

  if (!hideForm) {
    formBody = (
      <form id="owner-response-form" onSubmit={handleSubmit}>
        <fieldset id='owner-submit-form'>
          <legend>Leave a Response</legend>
          <label htmlFor="owner-response" className="owner-response-label" aria-label="owner-response-form">
            <textarea
              value={ownerResponse}
              onChange={e => setOwnerResponse(e.target.value)}
              id="owner-response"
              name="owner-response"
              placeholder="Your response"
            />
          </label>
          <button type="submit" id="submit-owner-response-btn">
            Submit
          </button>
        </fieldset>
      </form>
    );
  }

  if (successMessage) {
    formBody = <p>Thanks. Your response was saved.</p>;
  }

  return (
    <section className="submit-response">
      {formBody}
    </section>
  );
};

export default OwnerResponseForm;
