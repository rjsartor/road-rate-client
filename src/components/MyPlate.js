import React from 'react';
import PagesNav from './PagesNav';
import PlateAndReviews from './common/PlateAndReviews';
import '../styles/plates/single-plate.css';
import { useParams } from 'react-router-dom';
import UnclaimPlate from './UnclaimPlate';

export const MyPlate = () => {
  const { id } = useParams();
  
  return (
    <main className="plate-div">
      <PagesNav />
      <PlateAndReviews 
        fetchPlateUrl={`plates/${id}`} 
        fetchReviewsUrl={`reviews/my-plates/${id}`} 
      /> 
      <UnclaimPlate />
    </main>
  );
};

export default MyPlate;
