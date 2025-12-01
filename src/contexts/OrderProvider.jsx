import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const OrderContext = createContext();
function OrderProvider({children}) {
     const [orders,setOrders] = useState([]);

     useEffect(() => {
       const unsubscribe = fetchDocumentsRealtime("orders", (list) => {
          setOrders(list);
        });

    return () => unsubscribe();
     },[]);

    return (
        <OrderContext.Provider value={orders}>
             {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;


