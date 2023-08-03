import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import PagesNav from './PagesNav';
import '../styles/plates/my-plates-list.css';
import { usePlates } from '../hooks/use-plates';

export const MyPlatesList = () => {
  const navigate = useNavigate();

  console.log(localStorage)

  const { plates } = usePlates(localStorage.userId);

  console.log(plates)

  const myPlateClick = (plate) => {
    const plateEndpoint = `/my-plates/id/${plate.id}`;
    navigate(plateEndpoint, { state: { plate } });
  };

  const totalPlates = plates.length === 0 ? 
    'No plates associated' : 
    `Total Plates Owned: ${plates.length}`;

  const plateList = plates.map((plate, index) => (
    <li className='plate-list-item' key={index} tabIndex='0'>
      <button 
        className="my-plate-btn"
        onClick={() => myPlateClick(plate)}
      >
        {plate.plateNumber} - {plate.plateState}
      </button>
    </li>
  ));

  return (
    <main className="my-plates">  
      <PagesNav />
      <h2>My Plates</h2>
      {totalPlates}         
      <ul className='my-plates-list'>
        {plateList}
      </ul>
    </main>
  );
};

export default MyPlatesList;
