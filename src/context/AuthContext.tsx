'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Hydrate state from browser memory upon baseline app execution
        const storedToken = localStorage.getItem('intranet_token');
        const storedUser = localStorage.getItem('intranet_user');
    
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Authentication failure.');
        }

        const payload = await res.json();
    
        // Save to local device storage memory mapping arrays
        localStorage.setItem('intranet_token', payload.token);
        localStorage.setItem('intranet_user', JSON.stringify(payload.user));
    
        setToken(payload.token);
        setUser(payload.user);
    
        // Reroute developers directly into their assigned tier workflow paths
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('intranet_token');
        localStorage.removeItem('intranet_user');
        setToken(null);
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be mounted within a secure AuthProvider element tree.');
    return context;
};
