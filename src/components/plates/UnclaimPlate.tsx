import React, { FC, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

type UnclaimStatus = 'idle' | 'warning' | 'success' | 'error';

const UnclaimPlate: FC = () => {
  const [status, setStatus] = useState<UnclaimStatus>('idle');

  const { userId, myPlate, myState, authToken, success } = localStorage;

  const toggleWarning = () => setStatus(status === 'warning' ? 'idle' : 'warning');

  const unClaimPlateClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem('unclaimedPlate', myPlate);

    try {
      const response = await axios.put(`${API_BASE_URL}/plates/unclaim/${userId}`, {
        userId,
        plateNumber: myPlate,
        plateState: myState
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 200) {
        localStorage.setItem('success', 'unclaimed');
        setStatus('success');
      } else {
        console.log('Unclaiming failed:', response.statusText);
        setStatus('error');
      }
    } catch (error) {
      console.error('Unclaiming error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="unclaim-div">
      <button id="unregister-plate-btn" onClick={toggleWarning}>
        Unclaim this plate
      </button>
      {status === 'warning' && (
        <article className="unclaim-options">
          <p>Are you sure?</p>
          <article className="buttons-div">
            <button
              className='confirm-buttons'
              id="unclaim-plate-btn-confirm"
              onClick={unClaimPlateClick}
              disabled={success === 'unclaimed'}
            >
              Yes
            </button>
            <button
              className='confirm-buttons'
              id="unclaim-plate-btn-no"
              onClick={toggleWarning}
            >
              No
            </button>
          </article>
        </article>
      )}
      {status === 'success' && <p>You successfully unclaimed this plate.</p>}
      {status === 'error' && <p>Failed to unclaim the plate. Please try again.</p>}
    </section>
  );
};

export default UnclaimPlate;
