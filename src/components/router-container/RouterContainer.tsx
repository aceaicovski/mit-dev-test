import { createBrowserRouter } from "react-router-dom";

import ProTip from "../ui/ProTip";
import Home from "pages/Home";
import Login from "pages/Login";
import Products from "pages/Products";

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
    path: "/products",
    element: <Products />,
  },
  {
    path: "*",
    element: <ProTip />,
  },
]);

export default router;

