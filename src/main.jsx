import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import BackToTop from "./components/BackToTop/BackToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
      <BackToTop />
    </AuthProvider>
  </React.StrictMode>
);
