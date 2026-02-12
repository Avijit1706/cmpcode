import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { appConfig } from '../config';

type User = {
  username: string;
  name: string;
  email: string;
  permissions: string[];
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  username: 'alex.morgan',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  permissions: ['vm_view', 'service_view', 'service_catalog_order', 'reports_view']
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(appConfig.tokenStorageKey));
  const [user, setUser] = useState<User | null>(token ? mockUser : null);

  const login = () => {
    const nextToken = `mock-token-${Date.now()}`;
    localStorage.setItem(appConfig.tokenStorageKey, nextToken);
    setToken(nextToken);
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem(appConfig.tokenStorageKey);
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) return;
    const handle = setInterval(() => {
      const refreshed = `mock-token-${Date.now()}`;
      localStorage.setItem(appConfig.tokenStorageKey, refreshed);
      setToken(refreshed);
    }, appConfig.refreshEveryMs);

    return () => clearInterval(handle);
  }, [token]);

  const value = useMemo(
    () => ({ user, token, login, logout, isAuthenticated: Boolean(token) }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
