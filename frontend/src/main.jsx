import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Products />
    <Orders />
  </StrictMode>
);
