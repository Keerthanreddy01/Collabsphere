"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Mock user — Firebase auth is bypassed until real credentials are configured
const MOCK_USER = {
    uid: "mock-user-001",
    displayName: "Alex Rivera",
    email: "alex@collabsphere.dev",
    photoURL: "https://avatar.vercel.sh/alex-rivera",
};

const MOCK_PROFILE = {
    uid: "mock-user-001",
    name: "Alex Rivera",
    email: "alex@collabsphere.dev",
    avatar: "https://avatar.vercel.sh/alex-rivera",
    bio: "Fullstack developer passionate about building in public. Next.js, TypeScript, Rust.",
    skills: ["Next.js", "TypeScript", "Rust", "PostgreSQL", "Tailwind"],
    role: "Fullstack Developer",
    openToCollab: true,
    onboardingComplete: true,
    githubUrl: "https://github.com/alexrivera",
    location: "San Francisco, CA",
    timezone: "PST",
    createdAt: new Date().toISOString(),
};

interface AuthContextType {
    user: typeof MOCK_USER | null;
    profile: typeof MOCK_PROFILE | null;
    loading: boolean;
    loginWithGitHub: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate auth check completing
        const t = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(t);
    }, []);

    const loginWithGitHub = async () => {
        window.location.href = "/dashboard";
    };

    const loginWithGoogle = async () => {
        window.location.href = "/dashboard";
    };

    const logout = async () => {
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider
            value={{
                user: MOCK_USER,
                profile: MOCK_PROFILE,
                loading,
                loginWithGitHub,
                loginWithGoogle,
                logout,
            }}
        >
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
