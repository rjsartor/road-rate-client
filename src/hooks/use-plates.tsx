import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { PlateType } from '../types/plates.types';

export const usePlates = (userId: string): { plates: PlateType[] } => {
  const [plates, setPlates] = useState<PlateType[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchPlates = async () => {
      try {
        const response = await axios.get<PlateType[]>(`${API_BASE_URL}/plates/user/${userId}`);

        if (response.data) {
          setPlates(response.data);
          localStorage.setItem('hasPlates', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching plates:", error);
      }
    };

    fetchPlates();
  }, [userId]);

  return { plates };
};
