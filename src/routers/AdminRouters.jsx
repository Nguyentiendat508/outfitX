import React from 'react';
import DashBoard from '../pages/admin/dashboard/DashBoard';
import Categories from '../pages/admin/metadata/categories/Categories';
import CategoryType from '../pages/admin/metadata/category_types/CategoryType';
import Blog from '../pages/admin/contents/blogs/Blog';
import Contacts from '../pages/admin/contents/contacts/contacts';
import Rate from '../pages/admin/contents/rate/rate';
import Brands from '../pages/admin/commerce/brands/Brands';
import Orders from '../pages/admin/commerce/orders/Orders';
import Products from '../pages/admin/commerce/products/Products';
import NavBarAdmin from '../components/admin/NavBarAdmin';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import Background from '../components/admin/Background';
import { Route, Routes } from 'react-router-dom';

function AdminRouters() {
    const routers = [
        {
            path : "/admin",
            Element : <DashBoard />
        },
        {
            path:"/admin/categories",
            Element : <Categories />
        },
        {
            path: "/admin/category_type",
            Element : <CategoryType />
        },
        {
            path: "/admin/blogs",
            Element: <Blog />
        },
        {
            path: "/admin/contacts",
            Element: <Contacts />
        },
        {
            path:"/admin/rate",
            Element: <Rate />
        },
        {
            path: "/admin/brands",
            Element: <Brands />
        },
        {
            path: "/admin/orders",
            Element : <Orders />
        },
        {
            path: "/admin/products",
            Element: <Products />
        }
    ]
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Background />
            <div className="min-md:flex relative z-10">
                <NavBarAdmin />
                <div className="flex-1">
                    <HeaderAdmin />
                    <div className="text-white">
                        <Routes>
                            {
                                routers.map((e, idx) => (
                                    <Route key={idx} path={e.path} element={e.Element} />
                                ))
                            }
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRouters;