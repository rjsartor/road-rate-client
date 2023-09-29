import React, { FC, Fragment, useEffect, useState } from 'react';
import PagesNav from '../PagesNav';
import '../../styles/plates/public-plate.css';
import '../../styles/plates/single-plate.css';
import Plate from '../common/Plate';
import { Spinner } from 'reactstrap';
import { usePlate } from '../../hooks/use-plate';
import ReviewList from '../common/ReviewList';
import UnclaimPlate from './UnclaimPlate';
import ReviewForm from '../forms/ReviewForm';
import { PlateType } from '../../types/plates.types';
import { ReviewType } from '../../types/reviews.types';
import { UserType } from '../../types/auth.types';

export const PlatePage: FC = () => {
  const { plate, reviews }: { plate?: PlateType, reviews: ReviewType[] } = usePlate();

  const [userPlate, setIsUserPlate] = useState<boolean | null>(null);
  const [submitReview, setSubmitReview] = useState(false);
  
  const user: UserType | null = JSON.parse(localStorage.user || 'null');
  
  useEffect(() => {
    if (!plate || !user) {
      return;
    }
    setIsUserPlate(plate.userId === user.id);
  }, [plate, user]);

  if (!plate) return <Spinner />;

  return (
    <main className="plate-div">
      <PagesNav />
      <Plate plate={plate} />
      <ReviewList reviews={reviews} userPlate={userPlate} />
      <UnclaimPlate />
      {!userPlate && (
        <Fragment>
          <button
            className="add-review"
            onClick={() => setSubmitReview(prev => !prev)}
          >
            <span className="new-review">New Review</span>
          </button>
          {submitReview && user?.id && (
            <ReviewForm 
              userId={user?.id} 
              initialFormData={{ 
                plateNumber: plate.plateNumber,
                plateState: plate.plateState, 
              }}/>
          )}
          </Fragment>
      )}
    </main>
  );
};

export default PlatePage;
