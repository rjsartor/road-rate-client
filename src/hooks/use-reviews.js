import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export const useReviews = (reviewsUrl) => {
    const [ reviews, setReviews] = useState([]);

    const fetchReviews = async (reviewsUrl) => {
        let url = `${API_BASE_URL}/${reviewsUrl}`;
        console.log('url', url)
        const response = await fetch(url);
        const reviews  = await response.json();
        setReviews(reviews)
        return reviews
      }
  
    useEffect(() => {
        fetchReviews(reviewsUrl)
    }, [reviewsUrl]);

    return { reviews, setReviews }
}