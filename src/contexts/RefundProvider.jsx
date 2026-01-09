
import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const RefundContext = createContext();
function RefundProvider({children}) {
     const [refunds, setRefunds] = useState([]);

     useEffect(() => {
       const unsubscribe = fetchDocumentsRealtime("refund", (list) => {
          setRefunds(list);
        });
    return () => unsubscribe();
     },[]);

    return (
        <RefundContext.Provider value={refunds}>
             {children}
        </RefundContext.Provider>
    );
}



export default RefundProvider;
