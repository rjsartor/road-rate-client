import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getElapsedTime } from '../../utils/time.util';
import MaterialIcon from 'material-icons-react';
import OwnerResponseForm from '../owner-response-form';
import { useState } from 'react';

export const Review = ({ review, canClickPlate = true, userPlate = false }) => {
  const {
    _id,
    isPositive,
    ownerResponse,
    createdAt,
    plateId,
    plateState,
    plateNumber,
    message
  } = review;

  const [showResponseForm, setShowResponseForm] = useState(false);

  const navigate = useNavigate();
  const { elapsedTime, dateString } = getElapsedTime(createdAt);

  const handlePlateClick = () => {
    if (canClickPlate) navigate(`/plate/id/${plateId}`);
  };

  const ratingIcon = isPositive === 'true'
    ? <MaterialIcon icon="thumb_up" />
    : <MaterialIcon icon="thumb_down" />;

  return (
        <li className='review-item' key={_id} tabIndex='0'>
            <article className='review-header'>
              <article className='review-title'>
              <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
                <button
                    className="plate-btn"
                    onClick={handlePlateClick}
                    disabled={!canClickPlate}
                >
                    {plateNumber} {plateState}
                </button>
              <p className="elapsed-time">{elapsedTime}</p>
              </article>
              <article className='review-rating'>
                <p className='rating'>{ratingIcon}</p>
              </article>
            </article>
            <p className='message'>{message}</p>
            {ownerResponse && <article className="owner-comment">
              <p>{userPlate ? 'Your' : 'Driver'} Response: {ownerResponse}</p>
            </article>}
            {!ownerResponse && userPlate && (
                <button
                    id="owner-response-btn"
                    onClick={() => setShowResponseForm(prev => !prev)}
                >
                    Leave a response
                </button>
            )}
            {showResponseForm && <OwnerResponseForm reviewId={review._id} />}
            <p className='review-date'>{dateString}</p>
          </li>
  );
};
