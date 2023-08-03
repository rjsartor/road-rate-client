import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';

export const usePlate = () => {
  const { id } = useParams();

  const [plate, setPlate] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plateResponse = await fetch(`${API_BASE_URL}/plates/${id}`);
        const plateData = await plateResponse.json();
        setPlate(plateData);

        const reviewResponse = await fetch(`${API_BASE_URL}/reviews/plate/${id}`);
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return { plate, reviews };
};
