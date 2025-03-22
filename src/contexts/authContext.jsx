import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/authService";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      setIsAuthenticated(true); // Update authentication state
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false); // Update authentication state
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const signUp = async (email, password, username, firstname, lastname) => {
    try {
     const response =  await authService.signUp(email, password, username, firstname, lastname);
      response && login(email, password);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);