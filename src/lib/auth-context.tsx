'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types';
import { apiClient } from './api-client';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<User>;
  quickLoginAs: (email: string, pass: string) => Promise<User>;
  logout: () => void;
  hasRole: (...roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('sgm_user');
    const token = localStorage.getItem('sgm_access_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('sgm_user');
      }
    }
    setIsLoading(false);
  }, []);

  const redirectUser = (role: string) => {
    switch (role) {
      case 'SuperAdmin':
      case 'Admin':
        router.push('/admin');
        break;
      case 'Principal':
        router.push('/principal');
        break;
      case 'Teacher':
        router.push('/teacher');
        break;
      case 'Student':
        router.push('/student');
        break;
      case 'Parent':
        router.push('/parent');
        break;
      case 'Accountant':
        router.push('/accountant');
        break;
      case 'Librarian':
        router.push('/librarian');
        break;
      case 'AdmissionStaff':
        router.push('/admission');
        break;
      default:
        router.push('/admin');
    }
  };

  const login = async (identifier: string, pass: string): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        identifier,
        password: pass,
      });

      const { accessToken, refreshToken, user: userData } = response.data.data;
      localStorage.setItem('sgm_access_token', accessToken);
      localStorage.setItem('sgm_refresh_token', refreshToken);
      localStorage.setItem('sgm_user', JSON.stringify(userData));

      setUser(userData);
      setIsLoading(false);
      redirectUser(userData.role);
      return userData;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const quickLoginAs = async (email: string, pass: string): Promise<User> => {
    return login(email, pass);
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {}
    localStorage.removeItem('sgm_access_token');
    localStorage.removeItem('sgm_refresh_token');
    localStorage.removeItem('sgm_user');
    setUser(null);
    router.push('/login');
  };

  const hasRole = (...roles: string[]): boolean => {
    if (!user) return false;
    if (user.role === 'SuperAdmin') return true;
    return roles.includes(user.role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === 'SuperAdmin') return true;
    return user.permissions?.includes(permission) || user.permissions?.includes('*') || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        quickLoginAs,
        logout,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
