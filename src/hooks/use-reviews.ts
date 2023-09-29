import { useEffect, useState } from 'react';
import { ReviewType } from '../types/reviews.types';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const useReviews = (reviewsUrl: string) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [plateFilter, setPlateFilter] = useState<string>('');

  const fetchReviews = async (url: string) => {
    const response = await axios.get(`${API_BASE_URL}/${url}`);
    setReviews(response.data);
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

export default useReviews;
