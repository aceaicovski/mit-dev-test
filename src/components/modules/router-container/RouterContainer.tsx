import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "pages/Home";
import Login from "pages/Login";
import ProfilePage from "pages/ProfilePage";
import Products from "pages/Products";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../../../pages/NotFound";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<Products />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter(routes);

