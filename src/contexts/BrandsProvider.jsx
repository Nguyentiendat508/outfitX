import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const BrandsContext = createContext();
function  BrandsProvider({children}) {
     const [brands,setBrands] = useState([]);

     useEffect(() => {
       // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
       const unsubscribe = fetchDocumentsRealtime("brands", (brandsList) => {
          setBrands(brandsList);
        });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
     },[]);

    return (
        <BrandsContext.Provider value={brands}>
             {children}
        </BrandsContext.Provider>
    );
}

export default BrandsProvider;