import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import UserProfile from "../components/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddProperties from "../pages/PrivatePages/AddProperties/AddProperties";
import MyProperties from "../pages/PrivatePages/MyProperties/MyProperties";
import MyRatings from "../pages/PrivatePages/MyRatings/MyRatings";
import PropertyDetails from "../pages/PrivatePages/PropertyDetails/PropertyDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-properties", element: <AllProperties /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-properties",
        element: (
          <PrivateRoute>
            <AddProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "my-properties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
      {
        path: "property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
