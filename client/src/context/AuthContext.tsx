import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authApi } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: any) => Promise<User>; // Changed return type
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: any): Promise<User> => { // Changed return type
    setIsLoading(true);
    try {
      const response = await authApi.login(credentials);
      const { token, ...userData } = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      setToken(token);
      setIsLoading(false);
      return userData; // Return the user data
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(userData);
      const { token, ...user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};