import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

export const usePlates = (userId) => {
  const [plates, setPlates] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchPlates = async () => {
      const res = await fetch(`${API_BASE_URL}/plates/all/${userId}`);
      const plates = await res.json();

      if (plates) {
        setPlates(plates);
        localStorage.setItem('hasPlates', plates);
      }
    };

    fetchPlates();
  }, [userId]);

  return { plates };
};
