import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@shared/types';
import { api } from '@shared/lib/api';

interface AuthContextType {
 user: User | null;
 token: string | null;
 isLoading: boolean;
 login: (email: string, password: string) => Promise<void>;
 register: (email: string, password: string, name: string) => Promise<void>;
 logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
 const storedToken = localStorage.getItem('authToken');
 const storedUser = localStorage.getItem('authUser');
 if (storedToken && storedUser) {
 setToken(storedToken);
 setUser(JSON.parse(storedUser));
 }
 setIsLoading(false);
 }, []);

 const login = async (email: string, password: string) => {
 const response = await api.post('/auth/login', { email, password });
 const { token: newToken, user: userData } = response.data;
 setToken(newToken);
 setUser(userData);
 localStorage.setItem('authToken', newToken);
 localStorage.setItem('authUser', JSON.stringify(userData));
 };

 const register = async (email: string, password: string, name: string) => {
 const response = await api.post('/auth/register', { email, password, name });
 const { token: newToken, user: userData } = response.data;
 setToken(newToken);
 setUser(userData);
 localStorage.setItem('authToken', newToken);
 localStorage.setItem('authUser', JSON.stringify(userData));
 };

 const logout = () => {
 setToken(null);
 setUser(null);
 localStorage.removeItem('authToken');
 localStorage.removeItem('authUser');
 };

 const value = { user, token, isLoading, login, register, logout };
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}