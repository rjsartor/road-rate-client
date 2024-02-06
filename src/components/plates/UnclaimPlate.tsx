import React, { FC, useState } from 'react';
import AxiosService from '../../services/AxiosService';
import { PlateType } from '../../types/plates.types';

type UnclaimStatus = 'idle' | 'warning' | 'success' | 'error';

const UnclaimPlate: FC<{ plate: PlateType }> = ({ plate }) => {
  const { userId, plateNumber, plateState } = plate;
  const [status, setStatus] = useState<UnclaimStatus>('idle');

  const toggleWarning = () => setStatus(status === 'warning' ? 'idle' : 'warning');

  const unClaimPlateClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // localStorage.setItem('unclaimedPlate', plate);

    try {
      const response = await AxiosService.put(`plates/unclaim/${userId}`, {
        userId,
        plateNumber,
        plateState,
      });

      if (response.status === 204) {
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
      {status === 'idle' && <button id="unregister-plate-btn" onClick={toggleWarning}>
        Unclaim this plate
      </button>}
      {status === 'warning' && (
        <article className="unclaim-options">
          <p>Are you sure?</p>
          <article className="buttons-div">
            <button
              className='confirm-buttons'
              id="unclaim-plate-btn-confirm"
              onClick={unClaimPlateClick}
              // disabled={success === 'unclaimed'}
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
