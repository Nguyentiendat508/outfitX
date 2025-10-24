import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const CategoryTypesContext = createContext();
function CategoryTypeProvider({children}) {
     const [categoryTypes,setCategoryTypes] = useState([]);

     useEffect(() => {
       const unsubscribe = fetchDocumentsRealtime("category_Types", (list) => {
          setCategoryTypes(list);
        });

    return () => unsubscribe();
     },[]);

    return (
        <CategoryTypesContext.Provider value={categoryTypes}>
             {children}
        </CategoryTypesContext.Provider>
    );
}

export default CategoryTypeProvider;


