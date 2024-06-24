import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;

