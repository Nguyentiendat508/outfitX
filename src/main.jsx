import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CategoryProvider from "./contexts/CategoryProvider.jsx";
import CategoryTypeProvider from "./contexts/CategoryTypeProvider.jsx";
import BrandsProvider from "./contexts/BrandsProvider.jsx";
import ProductsProvider from "./contexts/ProductProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CategoryProvider>
      <CategoryTypeProvider>
        <BrandsProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </BrandsProvider>
      </CategoryTypeProvider>
    </CategoryProvider>
  </BrowserRouter>
);
