import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

interface OwnerResponseFormProps {
    reviewId: string;
    fetchReviews?: () => void;
}

export const OwnerResponseForm: React.FC<OwnerResponseFormProps> = ({ reviewId, fetchReviews }) => {
    const [ownerResponse, setOwnerResponse] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.put(`${API_BASE_URL}/reviews/${reviewId}`, {
                ownerResponse
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.authToken}`
                }
            });

            if (response.status === 200) {
                setIsSubmitted(true);
                localStorage.removeItem('submitResponse');
                if (fetchReviews) fetchReviews(); // todo: fix
            } else {
                setError('Unable to save your response. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <section className="submit-response">
            {isSubmitted ? 
            <p>Thanks. Your response was saved.</p> :
            <>
                <form id="owner-response-form" onSubmit={handleSubmit}>
                    <fieldset id='owner-submit-form'>
                        <legend>Leave a Response</legend>
                        <label htmlFor="submit-response" className="owner-response-label" aria-label="owner-response-form">
                            <textarea
                                value={ownerResponse}
                                onChange={e => setOwnerResponse(e.target.value)}
                                id="owner-response"
                                name="owner-response"
                                placeholder="Your response"
                            />
                        </label>

                        <button id="submit-owner-response-btn">
                            Submit
                        </button>
                    </fieldset>
                </form>
                {error && <p className="error">{error}</p>}
            </>}
        </section>
    );
};

export default OwnerResponseForm;
