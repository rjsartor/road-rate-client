import React from 'react';
import PagesNav from '../PagesNav';
import '../../styles/plates/public-plate.css';
import Plate from '../common/Plate';
import { Spinner } from 'reactstrap';
import { usePlate } from '../../hooks/use-plate';
import ReviewList from '../common/ReviewList';

export const PublicPlate = () => {
  const { plate, reviews } = usePlate();

  if (!plate) return <Spinner />;

  return (
  /* FETCHING PUBLIC PLATES & REVIEWS
    - An unregistered user can share this unique endpoint & render all plate info & its associated reviews
    - Ex: http://localhost:3000/plate/id/5c7082ce36aad20017f75ef8
    - Tested on Chrome, Firefox, & Safari
    - Doesn't rely on localStorage
    */

    <section className="plate-div">
      <PagesNav />
      <Plate plate={plate} />
      <ReviewList reviews={reviews} />
    </section>

  );
};

export default PublicPlate;
