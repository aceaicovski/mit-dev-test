import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "contexts/AuthContext";
import { router } from "components/router-container/RouterContainer";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

