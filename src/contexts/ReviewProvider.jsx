import React, { createContext, useEffect, useState } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ReviewContext = createContext([]);

function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchDocumentsRealtime("reviews", (list) => {
      setReviews(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ReviewContext.Provider value={reviews}>
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewProvider;
