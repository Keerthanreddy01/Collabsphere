import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    serverTimestamp,
    Timestamp,
    arrayUnion,
    arrayRemove,
    FieldValue
} from "firebase/firestore";
import { db } from "./firebase";

// Collection Names
export const COLLECTIONS = {
    USERS: "users",
    PROJECTS: "projects",
    APPLICATIONS: "applications",
    UPDATES: "updates",
    HACKATHONS: "hackathons",
    NOTIFICATIONS: "notifications",
};

// Generic Types
export interface UserProfile {
    uid: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    skills: string[];
    role: string;
    openToCollab: boolean;
    githubUsername?: string;
    location?: string;
    onboardingComplete: boolean;
    createdAt: Timestamp;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    techStack: string[];
    rolesNeeded: { role: string; description: string; filled: boolean }[];
    status: "planning" | "building" | "launched" | "needs-help";
    difficulty: "beginner" | "intermediate" | "advanced";
    teamSize: number;
    maxTeamSize: number;
    upvotes: string[]; // Array of uids
    viewCount: number;
    createdAt: Timestamp;
    githubUrl: string;
    demoUrl: string;
    bannerColor: string;
}

export interface Application {
    id: string;
    projectId: string;
    applicantId: string;
    ownerId: string;
    role: string;
    message: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Timestamp;
}

export interface BuildUpdate {
    id: string;
    projectId: string;
    authorId: string;
    content: string;
    likes: string[];
    comments: any[];
    createdAt: Timestamp;
}

// User Helpers
export const getUserProfile = async (uid: string) => {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
};

export const createUserProfile = async (uid: string, profile: Partial<UserProfile>) => {
    await setDoc(doc(db, COLLECTIONS.USERS, uid), {
        ...profile,
        uid,
        createdAt: serverTimestamp(),
    });
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    await updateDoc(doc(db, COLLECTIONS.USERS, uid), data);
};

// Project Helpers
export const createProject = async (projectData: Omit<Project, "id">) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.PROJECTS), {
        ...projectData,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

export const getProject = async (id: string) => {
    const snap = await getDoc(doc(db, COLLECTIONS.PROJECTS, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } as Project : null;
};

export const getAllProjects = async () => {
    const snap = await getDocs(query(collection(db, COLLECTIONS.PROJECTS), orderBy("createdAt", "desc")));
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const toggleUpvoteProject = async (projectId: string, userId: string, hasUpvoted: boolean) => {
    const projectRef = doc(db, COLLECTIONS.PROJECTS, projectId);
    await updateDoc(projectRef, {
        upvotes: hasUpvoted ? arrayRemove(userId) : arrayUnion(userId)
    });
};

// Application Helpers
export const createApplication = async (appData: Omit<Application, "id" | "createdAt" | "status">) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
        ...appData,
        status: "pending",
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

export const getApplicationsForProject = async (projectId: string) => {
    const q = query(collection(db, COLLECTIONS.APPLICATIONS), where("projectId", "==", projectId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
};

// Feed Helpers
export const postUpdate = async (projectId: string, authorId: string, content: string) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.UPDATES), {
        projectId,
        authorId,
        content,
        likes: [],
        comments: [],
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

export const getFeedUpdates = async (limitCount: number = 20) => {
    const q = query(collection(db, COLLECTIONS.UPDATES), orderBy("createdAt", "desc"), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BuildUpdate));
};
