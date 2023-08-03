import React from 'react';

export const SearchByPlate = ({ search, setSearch }) => {
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
              onChange={e => setSearch(e.target.value)}
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