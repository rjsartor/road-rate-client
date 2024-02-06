import React, { FC, Fragment, useEffect, useState } from 'react';
import PagesNav from '../PagesNav';
import '../../styles/plates/public-plate.css';
import '../../styles/plates/single-plate.css';
import { Spinner } from 'reactstrap';
import { UsePlateReturnType, usePlate } from '../../hooks/use-plate';
import ReviewList from '../common/ReviewList';
import UnclaimPlate from './UnclaimPlate';
import ReviewForm from '../forms/ReviewForm';
import { UserType } from '../../types/auth.types';
import LicensePlate from '../common/LicensePlate';
import Spacer from '../common/Spacer';

export const PlatePage: FC = () => {
  const { plate, reviews, refetch } = usePlate();
  const [userPlate, setIsUserPlate] = useState<boolean | null>(null);
  const [submitReview, setSubmitReview] = useState(false);
  
  const user: UserType | null = JSON.parse(localStorage.user || 'null');

  const handleSubmitReview = () => {
    setSubmitReview(false);
    refetch();
  }
  
  useEffect(() => {
    if (!plate || !user) {
      return;
    }
    setIsUserPlate(plate.userId === user.id);
  }, [plate, user]);

  if (!plate) return <Spinner />;

  const karmaStyling = plate.karma > 0
  ? 'wrapper-positive'
  : plate.karma < 0
    ? 'wrapper-negative'
    : 'wrapper-neutral';

  return (
    <main className="plate-div">
      <PagesNav />
      <Spacer height={3} />
      <article className={`public-plate ${karmaStyling}`}>
        <LicensePlate plateNumber={plate.plateNumber} plateState={plate.plateState} style={{ height: 150, width: 300 }} />
        <p>Karma: {plate.karma || 0}</p>
      </article>
      <ReviewList reviews={reviews} userPlate={userPlate} showPlate={false} />
      {userPlate && <UnclaimPlate plate={plate} />}
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
              handleSubmitReview={handleSubmitReview}
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
