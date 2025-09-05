import HomePage from "../features/home/pages/HomePage.tsx";
import OrdersPage from "../features/orders/pages/OrdersPage.tsx";
import { Navigate } from "react-router-dom";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
