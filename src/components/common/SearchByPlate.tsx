import React, { FC, ChangeEvent } from 'react';

interface SearchByPlateProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchByPlate: FC<SearchByPlateProps> = ({ search, setSearch }) => {
  return (
    <article className="search-section">
      <fieldset id="review-search">
        <legend>Search By License Plate</legend>
        <form
          id="search-form"
          className="search-form"
        >
          <article className="input-wrapper">
            <label
              htmlFor="search"
              className="search-label"
              aria-label="search-form"
            >
            <input
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              type="search"
              id="search"
              name="search"
              className="search-input"
              placeholder="2073WE..."
            />
            </label>
          </article>
        </form>
      </fieldset>
    </article>
  );
};
