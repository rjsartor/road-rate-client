import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import PagesNav from '../PagesNav';
import '../../styles/plates/my-plates-list.css';
import { usePlates } from '../../hooks/use-plates';
import { PlateType } from '../../types/plates.types';


const MyPlatesList: FC = () => {
  const navigate = useNavigate();

  // Assuming userId is stored in localStorage as a string.
  // If it can be null or undefined, add proper checks.
  const userId: string = localStorage.userId;
  const { plates } = usePlates(userId);

  const myPlateClick = (plate: PlateType) => {
    const plateEndpoint = `/my-plates/id/${plate.id}`;
    navigate(plateEndpoint, { state: { plate } });
  };

  const totalPlates = plates.length === 0
    ? 'No plates associated'
    : `Total Plates Owned: ${plates.length}`;

  return (
    <main className="my-plates">
      <PagesNav />
      <h2>My Plates</h2>
      <p>{totalPlates}</p>
      <ul className='my-plates-list'>
        {plates.map((plate, index) => (
          <li className='plate-list-item' key={index}>
            <button
              className="my-plate-btn"
              onClick={() => myPlateClick(plate)}
            >
              {plate.plateNumber} - {plate.plateState}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MyPlatesList;
