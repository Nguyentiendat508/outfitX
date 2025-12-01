import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
function AuthProvider({ children }) {
     const [accountLogin,setAccountLogin] = useState(null);
     const navigate = useNavigate();

    //hàm chạy 1 lần
     useEffect(() => {
        const a = localStorage.getItem("isLogin");
        setAccountLogin(JSON.parse(a))
     },[])
    const saveLogin = (acc)  => {
        localStorage.setItem("isLogin", JSON.stringify(acc));
        setAccountLogin(acc);
    }
    const handleLogout = () => {
        localStorage.removeItem("isLogin");
        setAccountLogin(null);
        navigate("/");
    }
    return (
        <AuthContext.Provider value={{ accountLogin , saveLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;