import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CategoryProvider from "./contexts/CategoryProvider.jsx";
import CategoryTypeProvider from "./contexts/CategoryTypeProvider.jsx";
import BrandsProvider from "./contexts/BrandsProvider.jsx";
import ProductsProvider from "./contexts/ProductProvider.jsx";
import AccountProvider from "./contexts/AccountProvider.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import CartItemProvider from "./contexts/CartItemProvider.jsx";
import OrderProvider from "./contexts/OrderProvider.jsx";
import ProvinceProvider from "./contexts/ProvinceProvider.jsx";
import OrderDetailProvider from "./contexts/OrderDetailProvider.jsx";
import { NotificationProvider } from "./contexts/NotificationProvider.jsx";
import ReviewProvider from "./contexts/ReviewProvider.jsx";
import RefundProvider from "./contexts/RefundProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CategoryProvider>
      <CategoryTypeProvider>
        <BrandsProvider>
          <ProductsProvider>
            <AccountProvider>
              <AuthProvider>
                <CartItemProvider>
                  <OrderProvider>
                    <ProvinceProvider>
                      <OrderDetailProvider>
                        <NotificationProvider>
                          <ReviewProvider>
                           <RefundProvider>
                              <App />
                           </RefundProvider>             
                          </ReviewProvider>
                        </NotificationProvider>
                      </OrderDetailProvider>
                    </ProvinceProvider>
                  </OrderProvider>
                </CartItemProvider>
              </AuthProvider>
            </AccountProvider>
          </ProductsProvider>
        </BrandsProvider>
      </CategoryTypeProvider>
    </CategoryProvider>
  </BrowserRouter>
);
