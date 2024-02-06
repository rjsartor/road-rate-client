import { useEffect, useState } from 'react';
import { ReviewType } from '../types/reviews.types';
import AxiosService from '../services/AxiosService';

const useReviews = (reviewsUrl: string) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [plateFilter, setPlateFilter] = useState<string>('');

  const fetchReviews = async () => {
    try {
      const { data } = await AxiosService.get(reviewsUrl);
      setReviews(data as ReviewType[]);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [reviewsUrl]);

  const filteredReviews = reviews.filter(r => r.plateNumber.includes(plateFilter));

  return { 
    reviews: filteredReviews, 
    setReviews, 
    plateFilter,
    setPlateFilter,
    refetch: fetchReviews,
  };
};

export default useReviews;
