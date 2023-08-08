import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

const UnclaimPlate = () => {
  const [unclaimMessage, setUnclaimMessage] = useState('');
  const [unclaimWarning, setUnclaimWarning] = useState(false);

  const unClaimPlateClick = async (e) => {
    e.preventDefault();
    const userId = localStorage.userId;
    localStorage.setItem('unclaimedPlate', localStorage.myPlate);

    try {
      const response = await fetch(`${API_BASE_URL}/plates/unclaim/${localStorage.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.authToken}`
        },
        body: JSON.stringify({
          userId,
          plateNumber: localStorage.myPlate,
          plateState: localStorage.myState
        })
      });

      if (response.ok) {
        localStorage.setItem('success', 'unclaimed');
        setUnclaimMessage('You successfully unclaimed this plate.');
      } else {
        console.log('Unclaiming failed:', response.statusText);
      }
    } catch (error) {
      console.error('Unclaiming error:', error);
    }
  };

  const unClaimButton = (
    <button id="unregister-plate-btn" onClick={() => setUnclaimWarning(!unclaimWarning)}>
      Unclaim this plate
    </button>
  );

  const confirmButton = unclaimWarning
    ? (
    <button
      className='confirm-buttons'
      id="unclaim-plate-btn-confirm"
      onClick={unClaimPlateClick}
      disabled={localStorage.success === 'unclaimed'}
    >
      Yes
    </button>
      )
    : null;

  const noButton = unclaimWarning
    ? (
    <button
      className='confirm-buttons'
      id="unclaim-plate-btn-no"
      onClick={() => setUnclaimWarning(!unclaimWarning)}
    >
      No
    </button>
      )
    : null;

  const areYouSureMessage = unclaimWarning ? <p>Are you sure?</p> : null;

  const unclaimMessageRender = unclaimMessage ? <p>{unclaimMessage}</p> : null;

  return (
    <section className="unclaim-div">
        {unClaimButton}
        <article className="unclaim-options">
        {areYouSureMessage}
        <article className="buttons-div">
            {confirmButton}
            {noButton}
        </article>
        {unclaimMessageRender}
        </article>
    </section>
  );
};

export default UnclaimPlate;
