import React from 'react';
import PagesNav from '../PagesNav';
import UnclaimPlate from './UnclaimPlate';
import Plate from '../common/Plate';
import { usePlate } from '../../hooks/use-plate';
import '../../styles/plates/single-plate.css';
import ReviewList from '../common/ReviewList';

export const MyPlate = () => {
  const { plate, reviews } = usePlate();

  return (
    <main className="plate-div">
      <PagesNav />
      <Plate plate={plate} />
      <ReviewList reviews={reviews} userPlate={true} />
      <UnclaimPlate />
    </main>
  );
};

export default MyPlate;
