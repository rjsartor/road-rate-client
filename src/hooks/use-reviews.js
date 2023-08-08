import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

export const useReviews = (reviewsUrl) => {
  const [reviews, setReviews] = useState([]);
  const [plateFilter, setPlateFilter] = useState('');

  const fetchReviews = async (reviewsUrl) => {
    const url = `${API_BASE_URL}/${reviewsUrl}`;
    const response = await fetch(url);
    const reviews = await response.json();
    setReviews(reviews);
    return reviews;
  };

  useEffect(() => {
    fetchReviews(reviewsUrl);
  }, [reviewsUrl]);

  const filteredReviews = reviews.filter(r => r.plateNumber.includes(plateFilter));

  return { 
    reviews: filteredReviews, 
    setReviews, 
    plateFilter,
    setPlateFilter
  };
};
