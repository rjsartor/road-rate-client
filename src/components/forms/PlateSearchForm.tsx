import React from 'react';
import { StateCode, StateSelect } from '../common/StateSelect';
import AxiosService from '../../services/AxiosService';
import { PlateType } from '../../types/plates.types';
import Spacer from '../common/Spacer';

interface PlateSearchFormProps {
  searchState: StateCode;
  setSearchState: (value: StateCode) => void;
  searchNumber: string;
  setSearchNumber: (state: string) => void;
  setSuccessMessage: (message: string) => void;
  setError: (message: string) => void;
  setPlate: (p: PlateType) => void;
}

const PlateSearchForm: React.FC<PlateSearchFormProps> = ({ 
  setSuccessMessage,
  setPlate,
  setError,
  searchState,
  setSearchState,
  searchNumber,
  setSearchNumber,
}) => {
  const fetchPlate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await AxiosService.get(`plates/`, {
        params: { state: searchState, number: searchNumber },
      });
      const [plate] = response.data as PlateType[];
      setPlate(plate);
    } catch (err) {
      setError('Failed to search for the plate. Please try again.');
    }
};


  return (
    <section className="claim-plate-search">
      <form id="claim-search-form" onSubmit={fetchPlate}>
        <fieldset id="claim-plate-search">
          <legend>Search a Valid Plate by State</legend>
          <Spacer height={1} />
          <article className="claim-plate-search-inputs">
            <Spacer width={1} />
            <input
              value={searchNumber}
              onChange={e => setSearchNumber(e.target.value.toUpperCase())}
              type="search"
              id="claim-search"
              name="claim-search"
              className="claim-search-input"
              placeholder="Search Plate Number"
              pattern="^[a-zA-Z0-9]{1,8}$"
              title="Plate number should be between 1 to 8 characters without special characters."
              aria-label="plate-number"
            />
            <Spacer width={1} />
            <StateSelect state={searchState as StateCode} setState={setSearchState} />
          </article>
          <Spacer height={1} />
          <button
            className="search-btn"
            aria-label="search-btn"
            onClick={() => { setSuccessMessage(''); }}
            disabled={!searchNumber || !searchState}
          >
            Search
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default PlateSearchForm;