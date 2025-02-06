import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/main";
import PrivateLayout from "../Layout/private";
import Login from "../pages/Login";
import AboutUs from "../pages/About Us";
import Register from "../pages/Register";
import HomePage from "../pages/Home";
import Products from "../pages/Products";
import EditPage from "../pages/Edit";
import AddBook from "../pages/Add";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "edit/:bookId",
          element: <EditPage />,
        },
        {
          path: "add",
          element: <AddBook />,
        },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      //   {
      //     path: "shop",
      //     element: <Shop />,
      //   },
      //   {
      //     path: "cart",
      //     element: <Cart />,
      //   },
    ],
  },
]);
