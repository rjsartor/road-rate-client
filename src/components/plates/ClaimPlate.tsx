import React, { useState } from 'react';
import PagesNav from '../PagesNav';
import '../../styles/plates/claim-plate.css';
import { StateCode } from '../common/StateSelect';
import PlateSearchForm from '../forms/PlateSearchForm';
import PlateTable from './PlateTable';
import { PlateType } from '../../types/plates.types';
import AxiosService from '../../services/AxiosService';

const getUserId = () => localStorage.getItem('userId');

const ClaimPlate: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [plate, setPlate] = useState<PlateType | null | undefined>(null);
  const [error, setError] = useState<string>('');
  const [searchNumber, setSearchNumber] = useState<string>('');
  const [searchState, setSearchState] = useState<string>('');

  const payload = {
    plateNumber: searchNumber,
    plateState: searchState,
    userId: getUserId(),
    isOwned: true,
  };

  // refactor to use a single function
  const registerPlate = async () => {
    try {
      const response = await AxiosService.post(`plates`, payload);
      setSuccessMessage(`Congrats! Your plate ${searchNumber} - ${searchState} was registered.`);
      return response.data;
    } catch (err) {
      setError('Failed to register the plate. Please try again.');
    }
  };

  const claimPlate = async () => {
    try {
      const response = await AxiosService.put(`plates/${getUserId()}`, payload);
      setSuccessMessage(`Congrats! Your plate ${searchNumber} - ${searchState} was registered.`);
      return response.data;
    } catch (err) {
      setError('Failed to claim the plate. Please try again.');
    }
  };

  return (
    <main className="claim-plate">
      <PagesNav />
      <h2>Claim A Plate</h2>
      <section className="claim-plate-search">
        <PlateSearchForm
          searchNumber={searchNumber}
          searchState={searchState as StateCode}
          setSearchState={setSearchState}
          setSearchNumber={setSearchNumber}
          setPlate={setPlate}
          setSuccessMessage={setSuccessMessage}
          setError={setError}
        />
      </section>
      <section className="plate-table">
        <PlateTable 
          plate={plate}
          claimPlate={claimPlate}
          registerPlate={registerPlate}
          plateNumber={searchNumber}
          plateState={searchState}
          successMessage={successMessage}
        />
      </section>
      <p>{successMessage}</p>
      {<p>{error}</p>}
    </main>
  );
};

export default ClaimPlate;
