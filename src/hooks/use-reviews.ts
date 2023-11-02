import { useEffect, useState } from 'react';
import { ReviewType } from '../types/reviews.types';
import AxiosService from '../services/AxiosService';

const useReviews = (reviewsUrl: string) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [plateFilter, setPlateFilter] = useState<string>('');

  const fetchReviews = async (url: string) => {
    const { data } = await AxiosService.get(url);
    setReviews(data as ReviewType[]);
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
