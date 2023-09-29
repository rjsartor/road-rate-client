import React from 'react';
import { StateCode, StateSelect } from '../common/StateSelect';

interface PlateSearchFormProps {
  plateNumber: string;
  setPlateNumber: (value: string) => void;
  plateState: StateCode;
  setPlateState: (state: StateCode) => void;
  fetchPlate: () => void;
  setSuccessMessage: (message: string) => void;
}

const PlateSearchForm: React.FC<PlateSearchFormProps> = ({ 
  plateNumber, 
  setPlateNumber, 
  plateState, 
  setPlateState, 
  fetchPlate, 
  setSuccessMessage 
}) => (
  <section className="claim-plate-search">
    <form id="claim-search-form" onSubmit={fetchPlate}>
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
          <StateSelect state={plateState as StateCode} setState={setPlateState} />
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
);

export default PlateSearchForm;