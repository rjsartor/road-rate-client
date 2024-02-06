import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';
import { PlateType } from '../types/plates.types';
import { ReviewType } from '../types/reviews.types';

export interface UsePlateReturnType {
  plate: PlateType | undefined;
  reviews: ReviewType[];
  refetch: () => void;
}

export const usePlate = (): UsePlateReturnType => {
  const { id } = useParams();

  const [plate, setPlate] = useState<PlateType | undefined>();
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const fetchData = async () => {
    try {
      const plateResponse = await fetch(`${API_BASE_URL}/plates/${id}`);
      const plateData: PlateType = await plateResponse.json();
      setPlate(plateData);

      const reviewResponse = await fetch(`${API_BASE_URL}/reviews/plate/${id}`);
      const reviewData: ReviewType[] = await reviewResponse.json();
      setReviews(reviewData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { plate, reviews, refetch: fetchData  };
};
