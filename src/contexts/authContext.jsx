import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthData = useCallback(() => {
    const accessToken = Cookies.get("refresh_token");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          Cookies.remove("refresh_token");
          return;
        }

        setUser({
          id: decoded.user_id,
          username: decoded.username,
          email: decoded.email,
          firstName: decoded.first_name,
          lastName: decoded.last_name,
          isStudent: decoded.is_student,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    }

    setIsLoading(false);
  }, []);

  const clearAuthData = useCallback(() => {
    setIsAuthenticated(false);
    setIsLoading(false);
    setUser(null);
  }, []);

  useEffect(() => {
    setAuthData();
  }, [setAuthData]);

  // Login function
  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      setAuthData();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Social login function
  const socialLogin = async (provider) => {
    try {
      await authService.socialLogin(provider);
      setAuthData();
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      clearAuthData();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const signUp = async (email, password, username, firstname, lastname) => {
    try {
      const response = await authService.signUp(
        email,
        password,
        username,
        firstname,
        lastname,
      );
      response && login(email, password);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user,
        login,
        logout,
        signUp,
        socialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);
