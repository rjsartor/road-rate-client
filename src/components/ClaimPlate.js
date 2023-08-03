import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import PagesNav from './PagesNav';
import '../styles/plates/claim-plate.css';
import { StateSelect } from './StateSelect';

const ClaimPlate = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [plateState, setPlateState] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [plate, setPlate] = useState(null);

  const handleSearchPlate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/plates/?state=${plateState}&search=${plateNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.authToken}`
        }
      });
      const [data] = await response.json();
      setPlate(data);
    } catch (error) {
      setPlate(null);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw error;
      }
      console.error(error);
    }
  };

  const handlePlateRegister = async (e) => {
    e.preventDefault();
    const userId = localStorage.userId;
    try {
      const response = await fetch(`${API_BASE_URL}/plates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.authToken}`
        },
        body: JSON.stringify({
          plateNumber: plateNumber.toUpperCase(),
          plateState,
          userId,
          isOwned: true
        })
      });
      const data = await response.json();
      setSuccessMessage(`Congrats! Your plate ${plateNumber} - ${plateState} was registered.`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleClaimClick = async (e) => {
    e.preventDefault();
    const userId = localStorage.userId;
    localStorage.setItem('myPlate', plateNumber);
    localStorage.setItem('myState', plateState);
    try {
      const response = await fetch(`${API_BASE_URL}/plates/${localStorage.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.authToken}`
        },
        body: JSON.stringify({
          userId,
          plateNumber: plateNumber.toUpperCase(),
          plateState
        })
      });
      const data = await response.json();
      setSuccessMessage(`Congrats! Your plate ${plateNumber} - ${plateState} was registered.`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const renderPlateTable = () => {
    const claimButton = (onClick, text) => (
      <button
        className="register-plate"
        onClick={(e) => onClick(e)}
        disabled={successMessage}
      >
        {text}
      </button>
    );

    let plateAction;
    if (plate) {
      if (plate?.isOwned) {
        plateAction = (
          <>
            <td>'ALREADY CLAIMED'</td>
            <tr>
              <td colSpan="4">
                <p>Need to <strong>Unlink</strong> your plate? Go to:</p>
                <Link to="/my-plates">
                  <span className="my-plates-link">My Plates</span>
                </Link>
              </td>
            </tr>
          </>
        );
      } else {
        plateAction = <td>{claimButton(handleClaimClick, 'Claim Plate')}</td>;
      }
    } else if (plate === undefined) {
      plateAction = (
        <td colSpan="2">
          {claimButton(handlePlateRegister, 'Register Plate')}
        </td>
      );
    }

    return (
      <table>
        <tbody>
          <tr>
            <th>
              <span className="mobile-hide">License</span> Plate
            </th>
            <th>State</th>
            <th>Add<span className="mobile-hide"> to Your Account</span></th>
            {plateAction && <th>Register <span className="mobile-hide">Your Plate</span></th>}
          </tr>
          {(plate || plate === undefined) && (<tr>
              <td>{plate === undefined ? plateNumber : plate.plateNumber}</td>
              <td>{plate === undefined ? plateState : plate.plateState}</td>
              {plateAction}
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <main className="claim-plate">
      <PagesNav />
      <h2>Claim A Plate</h2>
      <section className="claim-plate-search">
        <form id="claim-search-form" onSubmit={handleSearchPlate}>
          <fieldset id="claim-plate-search">
            <legend>Search a Valid Plate by State</legend>
            <article className="claim-plate-search-inputs">
              <label htmlFor="claim-search" className="claim-search-label" aria-label="claim-search-form">
                Search Plate Numbers:
              </label>
              <input
                value={plateNumber}
                onChange={e => setPlateNumber(e.target.value.toUpperCase())}
                type="search"
                id="claim-search"
                name="claim-search"
                className="claim-search-input"
                placeholder="Search Plate Numbers"
                pattern="^[a-zA-Z0-9]{1,8}$"
                title="Plate number should be between 1 to 8 characters without special characters."
                aria-label="plate-number"
              />
              <label className='plate-state-label' htmlFor='plate-state'></label>
              <StateSelect state={plateState} setState={setPlateState} />
            </article>
            <button
              className="search-btn"
              aria-label="search-btn"
              onClick={() => { setSuccessMessage(''); }}
              disabled={!plateNumber || !plateState}
            >
              Search
            </button>
          </fieldset>
        </form>
      </section>
      <section className="plate-table">
        {renderPlateTable()}
      </section>
      <p>{successMessage}</p>
    </main>
  );
};

export default ClaimPlate;
