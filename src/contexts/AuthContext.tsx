import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getJWTToken,
  getUserProfile,
  logout as logoutService,
} from "../services/authService";
import { UpdateUserPayload, UserProfile } from "shared/models/user.interface";
import { deleteUserProfile, updateUserProfile } from "services/userService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (id: number, body: UpdateUserPayload) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const data = await getJWTToken(email, password);
      if (data.access_token) {
        setIsAuthenticated(true);
        setError(null);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
    setUser(null);
  };

  const getUser = async () => {
    try {
      const user = await getUserProfile();
      if (user) {
        setUser(user);
      }
    } catch (error: any) {
      console.error(error.response?.data?.message || "Login action failed");
    }
  };

  const updateUser = async (id: number, body: UpdateUserPayload) => {
    try {
      const updatedUser = await updateUserProfile(id, body);
      setUser(updatedUser);
    } catch (error: any) {
      console.error(
        error.response?.data?.message || "The user couldn't be updated"
      );
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const deleteResponse = await deleteUserProfile(id);
      if (deleteResponse) {
        logout();
      }
    } catch (error: any) {
      console.error(
        error.response?.data?.message || "The user couldn't be deleted"
      );
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("access_token");

    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  console.log(isAuthenticated, user);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        updateUser,
        deleteUser,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

