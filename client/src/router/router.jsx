import { createBrowserRouter, Outlet } from "react-router";
import React from "react";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import Layout from "../components/layout/Layout";
import ProfilePage from "../pages/profile/ProfilePage";
import ProductsPage from "../pages/products/ProductsPage";
import ProductPage from "../pages/product/ProductPage";
import CartPage from "../pages/cart/CartPage";
import OrdersPage from "../pages/orders/OrdersPage";
import OrderPage from "../pages/order/OrderPage";
import ChangePasswordPage from "../pages/change-password/ChangePasswordPage";
import NewOrderPage from "../pages/new-order/NewOrderPage";
import AuthOutlet from "../auth/AuthOutlet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthOutlet/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <Layout/>,
        children: [
          {
          index: true,
          element: <HomePage/>,
          },
          {
            path: "profile",
            element: <ProfilePage/>,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage/>
          },
          {
            path: "products",
            element: <ProductsPage/>,
          },
          {
            path: "products/:id",
            element: <ProductPage/>,
          },
          {
            path: "cart",
            element: <CartPage/>,
          },
          {
            path: "orders",
            element: <OrdersPage/>,
          },
          {
            path: "orders/new",
            element: <NewOrderPage/>,
          },
          {
            path: "orders/:id",
            element: <OrderPage/>,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "register",
        element: <RegisterPage/>,
      },
    ],
  },
]);
