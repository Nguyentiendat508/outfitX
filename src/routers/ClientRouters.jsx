import React from 'react';
import Detail from '../pages/client/detail/Detail';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/client/main/Main';
import SearchPage from '../pages/client/search/SearchPage';
import Register from '../pages/client/auth/Register';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import Login from '../pages/client/auth/Login';

function ClientRouters() {
    const routers = [
        {
            path: "/",
            Element: <Main/>
        },
        {
            path : "/detail",
            Element: <Detail />
        },
        {
            path : "/search",
            Element: <SearchPage />
        },
        {
            path : "/register",
            Element: <Register/>
        },
        {
            path : "/login",
            Element: <Login/>
        }
    ]

    return (
        <>
            <Header />
            <Routes>
                {
                    routers.map((e, idx) => (
                        <Route key={idx} path={e.path} element={e.Element} />
                    ))
                }
            </Routes>
            <Footer />
        </>
    );
}

export default ClientRouters;