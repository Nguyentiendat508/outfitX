import React from "react";
import DashBoard from "../pages/admin/dashboard/DashBoard";
import Categories from "../pages/admin/metadata/categories/Categories";
import CategoryType from "../pages/admin/metadata/category_types/CategoryType";
import Blog from "../pages/admin/contents/blogs/Blog";
import Contacts from "../pages/admin/contents/contacts/contacts";
import Brands from "../pages/admin/commerce/brands/Brands";
import Orders from "../pages/admin/commerce/orders/Orders";
import Products from "../pages/admin/commerce/products/Products";
import { Route, Routes } from "react-router-dom";
import OrderDetail from "../pages/admin/commerce/orders/OrderDetail";
import Accounts from "../pages/admin/accounts/Accounts";
import Refund from "../pages/admin/contents/refund/Refund";

function AdminRouters() {
  const routers = [
    {
      path: "/admin",
      Element: <DashBoard />,
    },
    {
      path: "/admin/categories",
      Element: <Categories />,
    },
    {
      path: "/admin/category_type",
      Element: <CategoryType />,
    },
    {
      path: "/admin/blogs",
      Element: <Blog />,
    },
    {
      path: "/admin/contacts",
      Element: <Contacts />,
    },
    {
      path: "/admin/refund",
      Element: <Refund/>,
    },
    {
      path: "/admin/brands",
      Element: <Brands />,
    },
    {
      path: "/admin/orders",
      Element: <Orders />,
    },
    {
      path: "/admin/orders/:id",
      Element: <OrderDetail />,
    },

    {
      path: "/admin/products",
      Element: <Products />,
    },
    {
      path: "/admin/accounts",
      Element: <Accounts/>,
    }
  ];
  return (
    <Routes>
      {routers.map((e, idx) => (
        <Route key={idx} path={e.path} element={e.Element} />
      ))}
    </Routes>
  );
}

export default AdminRouters;
