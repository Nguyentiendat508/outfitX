import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const OrderDetailContext = createContext();
function OrderDetailProvider({children}) {
     const [orderDetail,SetOrderDetail] = useState([]);

     useEffect(() => {
       const unsubscribe = fetchDocumentsRealtime("orderDetails", (list) => {
          SetOrderDetail(list);
        });

    return () => unsubscribe();
     },[]);
  
    return (
        <OrderDetailContext.Provider value={orderDetail}>
             {children}
        </OrderDetailContext.Provider>
    );
}

export default OrderDetailProvider;


