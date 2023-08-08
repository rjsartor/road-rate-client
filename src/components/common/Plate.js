import React from 'react';

const Plate = ({ plate }) => {
  if (!plate) return <p>Loading plate...</p>;

  const karmaStyling = plate.karma > 0
    ? 'public-plate-wrapper-positive'
    : plate.karma < 0
      ? 'public-plate-wrapper-negative'
      : 'public-plate-wrapper-neutral';

  return (
        <article className={karmaStyling}>
            <article className='plate-content'>
            <article className='plate-title'>
                <h2 id={plate.plateId}>{plate.plateNumber}</h2>
            </article>
            <article className='plate-info'>
                <p>State: {plate.plateState}</p>
                <p>Karma: {plate.karma || 0}</p>
            </article>
            </article>
        </article>
  );
};

export default Plate;
