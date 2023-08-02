import React  from 'react'; 
import PagesNav from './PagesNav';
import '../styles/plates/public-plate.css';
import PlateAndReviews from './common/PlateAndReviews';
import { useParams } from 'react-router-dom';

export const PublicPlate = () => {
  const { id } = useParams();
  
  return (
    /* FETCHING PUBLIC PLATES & REVIEWS 
    - An unregistered user can share this unique endpoint & render all plate info & its associated reviews
    - Ex: http://localhost:3000/plate/id/5c7082ce36aad20017f75ef8
    - Tested on Chrome, Firefox, & Safari
    - Doesn't rely on localStorage
    */
    
    <section className="plate-div">
      <PagesNav />
      <PlateAndReviews 
        fetchPlateUrl={`plates/${id}`} 
        fetchReviewsUrl={`reviews/plate/${id}`} 
      /> 
    </section>

  ); 
};

export default PublicPlate;
