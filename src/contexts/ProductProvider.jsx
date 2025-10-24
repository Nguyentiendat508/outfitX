
import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';


export const ProductsContext = createContext();
function ProductsProvider({children}) {
     const [products, setProducts] = useState([]);

     useEffect(() => {
       const unsubscribe = fetchDocumentsRealtime("products", (list) => {
          setProducts(list);
        });

    return () => unsubscribe();
     },[]);

    return (
        <ProductsContext.Provider value={products }>
             {children}
        </ProductsContext.Provider>
    );
}

export default ProductsProvider;


