"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@collabsphere/types";

interface AuthContextType {
    user: User | null;
    profile: User | null;
    loading: boolean;
    loginWithGitHub: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Replace with actual backend auth system
        // This should:
        // 1. Check if user is authenticated on mount
        // 2. Fetch user profile from backend
        // 3. Set loading state appropriately
        setLoading(false);
    }, []);

    const loginWithGitHub = async () => {
        // TODO: Implement GitHub OAuth login with backend
        throw new Error("GitHub login not yet implemented");
    };

    const loginWithGoogle = async () => {
        // TODO: Implement Google OAuth login with backend
        throw new Error("Google login not yet implemented");
    };

    const logout = async () => {
        // TODO: Implement logout with backend
        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, loginWithGitHub, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
