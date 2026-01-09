
import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const CartItemContext = createContext();
function CartItemProvider({children}) {
     const [cartItems, setCartItems] = useState([]);

     useEffect(() => {
       const unsubscribe = fetchDocumentsRealtime("cartItems", (list) => {
          setCartItems(list);
        });
    return () => unsubscribe();
     },[]);

    return (
        <CartItemContext.Provider value={cartItems}>
             {children}
        </CartItemContext.Provider>
    );
}

export default CartItemProvider;