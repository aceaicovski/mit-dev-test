import { RouterProvider } from "react-router-dom";

import router from "./components/router-container/RouterContainer";
import { AuthProvider } from "contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

