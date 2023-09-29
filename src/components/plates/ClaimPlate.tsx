import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import PagesNav from '../PagesNav';
import '../../styles/plates/claim-plate.css';
import { StateCode } from '../common/StateSelect';
import axios from 'axios';
import PlateSearchForm from '../forms/PlateSearchForm';
import PlateTable from './PlateTable';
import { PlateType } from '../../types/plates.types';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const getAuthToken = () => `Bearer ${localStorage.getItem('authToken')}`;
const getUserId = () => localStorage.getItem('userId');

const ClaimPlate: React.FC = () => {
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [plateState, setPlateState] = useState<StateCode | ''>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [plate, setPlate] = useState<PlateType | null | undefined>(null);
  const [error, setError] = useState<string>('');

  const fetchPlate = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/plates/`, {
        params: { state: plateState, search: plateNumber },
        headers: { ...HEADERS, Authorization: getAuthToken() }
      });
      const [data] = response.data;
      setPlate(data);
    } catch (err) {
      setError('Failed to search for the plate. Please try again.');
    }
  };

  const registerPlate = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/plates`, {
        plateNumber: plateNumber.toUpperCase(),
        plateState,
        userId: getUserId(),
        isOwned: true
      }, {
        headers: { ...HEADERS, Authorization: getAuthToken() }
      });
      setSuccessMessage(`Congrats! Your plate ${plateNumber} - ${plateState} was registered.`);
      return response.data;
    } catch (err) {
      setError('Failed to register the plate. Please try again.');
    }
  };

  const claimPlate = async () => {
    try {
      localStorage.setItem('myPlate', plateNumber);
      localStorage.setItem('myState', plateState);
      
      const response = await axios.put(`${API_BASE_URL}/plates/${getUserId()}`, {
        userId: getUserId(),
        plateNumber: plateNumber.toUpperCase(),
        plateState
      }, {
        headers: { ...HEADERS, Authorization: getAuthToken() }
      });
      setSuccessMessage(`Congrats! Your plate ${plateNumber} - ${plateState} was registered.`);
      return response.data;
    } catch (err) {
      setError('Failed to claim the plate. Please try again.');
    }
  };

  useEffect(() => {
    setError('');
  }, [plate, plateState]);

  return (
    <main className="claim-plate">
      <PagesNav />
      <h2>Claim A Plate</h2>
      <section className="claim-plate-search">
        <PlateSearchForm 
          plateNumber={plateNumber}
          setPlateNumber={setPlateNumber}
          plateState={plateState as StateCode}
          setPlateState={setPlateState}
          fetchPlate={fetchPlate}
          setSuccessMessage={setSuccessMessage}
        />
      </section>
      <section className="plate-table">
      <PlateTable 
        plate={plate}
        claimPlate={claimPlate}
        registerPlate={registerPlate}
        plateNumber={plateNumber}
        plateState={plateState}
        successMessage={successMessage}
      />
      </section>
      <p>{successMessage}</p>
      {<p>{error}</p>}
    </main>
  );
};

export default ClaimPlate;
