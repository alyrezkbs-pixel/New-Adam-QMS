import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type UserRole = 'ceo' | 'qualityAdmin' | 'hod' | 'staff';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  deptId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = (role: UserRole) => {
    // In a real app, this would make an API call to authenticate the user
    // For demo purposes, we'll create a mock user based on the selected role
    const mockUsers: Record<UserRole, User> = {
      ceo: {
        id: '1',
        name: 'CEO User',
        email: 'ceo@hospital.com',
        role: 'ceo',
      },
      qualityAdmin: {
        id: '2',
        name: 'Quality Admin',
        email: 'quality@hospital.com',
        role: 'qualityAdmin',
      },
      hod: {
        id: '3',
        name: 'Department Head',
        email: 'hod@hospital.com',
        role: 'hod',
        deptId: 'dept1', // OPD department
      },
      staff: {
        id: '4',
        name: 'Staff Member',
        email: 'staff@hospital.com',
        role: 'staff',
        deptId: 'dept1', // OPD department
      },
    };

    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};