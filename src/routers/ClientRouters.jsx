import React from "react";
import Detail from "../pages/client/detail/Detail";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/client/main/Main";
import SearchPage from "../pages/client/search/SearchPage";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import SearchConllection from "../pages/client/search/SearchConllection";
import Cartpay from "../pages/client/cartpay/Cartpay";
import OrderPage from "../pages/client/order/OrderPage";
import Product from "../pages/client/product/Product";
import OrderItem from "../pages/client/order/OrderItem";
import OrderReview from "../pages/client/order/OrderReview";
import Brand from "../pages/client/brand/Brand";
import Blog from "../pages/client/blog/Blog";
import BlogDetail from "../pages/client/blog/BlogDetall";

function ClientRouters() {
  const routers = [
    {
      path: "/",
      Element: <Main />,
    },
    {
      path: "/detail/:id",
      Element: <Detail />,
    },
    {
      path: "/pay",
      Element: <Cartpay />,
    },
    {
      path: "/search",
      Element: <SearchPage />,
    },
    {
      path: "/searchconllection/:id",
      Element: <SearchConllection />,
    },
    {
      path: "/orderpage",
      Element: <OrderPage />,
    },
    {
      path: "/orderitem/:id",
      Element: <OrderItem />,
    },
    {
      path: "/product",
      Element: <Product />,
    },
    {
      path: "/review/:id",
      Element: <OrderReview />,
    },
    {
      path: "/brand/:id",
      Element: <Brand/>,
    },
    {
      path: "/blog",
      Element: <Blog/>,
    },
    {
      path: "/blogDetail/:id",
      Element: <BlogDetail/>,
    }
  ];

  return (
    <>
      <Routes>
        {routers.map((e, idx) => (
          <Route key={idx} path={e.path} element={e.Element} />
        ))}
      </Routes>
    </>
  );
}

export default ClientRouters;
