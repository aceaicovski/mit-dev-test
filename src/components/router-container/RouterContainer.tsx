import { createBrowserRouter } from "react-router-dom";

import ProTip from "../ui/ProTip";
import Home from "pages/Home";
import Login from "pages/Login";
import ProfilePage from "pages/ProfilePage";
import Products from "pages/Products";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "*",
    element: <ProTip />,
  },
]);

export default router;

