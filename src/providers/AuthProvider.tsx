"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User,
    signInWithPopup,
    signOut,
    GithubAuthProvider,
    GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserProfile, COLLECTIONS } from "@/lib/firestore";

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    loginWithGitHub: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                // Fetch or create profile
                const userRef = doc(db, COLLECTIONS.USERS, user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setProfile(userSnap.data() as UserProfile);
                } else {
                    // New user
                    const newProfile: UserProfile = {
                        uid: user.uid,
                        name: user.displayName || "New Builder",
                        email: user.email || "",
                        avatar: user.photoURL || "",
                        bio: "",
                        skills: [],
                        role: "Developer",
                        openToCollab: true,
                        onboardingComplete: false,
                        createdAt: serverTimestamp() as any, // Firebase handles this
                    };
                    await setDoc(userRef, newProfile);
                    setProfile(newProfile);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGitHub = async () => {
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await signOut(auth);
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
