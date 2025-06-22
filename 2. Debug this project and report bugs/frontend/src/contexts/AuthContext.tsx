import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from a database
const MOCK_USERS = [
  {
    id: 1,
    email: 'demo@example.com',
    username: 'demo_user',
    password: 'password123'
  },
  {
    id: 2,
    email: 'test@example.com',
    username: 'test_user',
    password: 'password123'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username
      };
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return false;
    }
    
    // Create new user (in a real app, this would be saved to a database)
    const newUser = {
      id: MOCK_USERS.length + 1,
      email,
      username,
      password
    };
    
    MOCK_USERS.push(newUser);
    
    const userData = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    };
    
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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