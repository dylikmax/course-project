import { createBrowserRouter, Outlet } from "react-router";
import React from "react";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import Layout from "../components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <><Outlet/></>,
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
            element: <>My profile</>,
          },
          {
            path: "products",
            element: <>Products</>,
          },
          {
            path: "products/:id",
            element: <>Product with ID</>,
          },
          {
            path: "cart",
            element: <>Cart</>,
          },
          {
            path: "orders",
            element: <>Orders</>,
          },
          {
            path: "orders/:id",
            element: <>Order with ID</>,
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
