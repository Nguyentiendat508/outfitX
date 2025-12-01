import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const AccountContext = createContext();
function  AccountProvider({children}) {
     const [accounts, setAccounts] = useState([]);

     useEffect(() => {
       // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
       const unsubscribe = fetchDocumentsRealtime("accounts", (accountsList) => {
          setAccounts(accountsList);
        });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
     },[]);

    return (
        <AccountContext.Provider value={accounts}>
             {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;