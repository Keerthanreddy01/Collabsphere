import { Timestamp } from "firebase/firestore";

export * from "./theme";

export interface User {
    uid: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    skills: string[];
    role: "student" | "developer" | "designer" | "entrepreneur";
    openToCollab: boolean;
    githubUsername: string;
    location: string;
    onboardingComplete: boolean;
    createdAt: Timestamp;
    lastSeen: Timestamp;
    streak?: {
        count: number;
        lastActiveDate: Timestamp;
    };
}

export interface Project {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    techStack: string[];
    rolesNeeded: {
        role: string;
        description: string;
        filled: boolean;
    }[];
    status: "planning" | "building" | "launched" | "needs-help";
    difficulty: "beginner" | "intermediate" | "advanced";
    teamMembers: string[];
    maxTeamSize: number;
    upvotes: string[];
    viewCount: number;
    githubUrl: string;
    demoUrl: string;
    createdAt: Timestamp;
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

export interface Conversation {
    id: string;
    type: "direct" | "team";
    participants: string[];
    projectId?: string;
    lastMessage: {
        text: string;
        senderId: string;
        timestamp: Timestamp;
    };
    lastMessageAt: Timestamp;
    unreadCount: Record<string, number>;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    mediaUrl?: string;
    mediaType?: "image" | "file";
    reactions: Record<string, string[]>;
    replyTo?: {
        messageId: string;
        text: string;
        senderName: string;
    };
    readBy: string[];
    createdAt: Timestamp;
    edited: boolean;
    editedAt?: Timestamp;
    isDeleted?: boolean;
    deletedAt?: Timestamp;
}

export interface ProjectUpdate {
    id: string;
    projectId: string;
    projectName?: string;
    authorId: string;
    authorName?: string;
    content: string;
    mediaUrl?: string;
    likes: string[];
    comments: {
        uid: string;
        text: string;
        createdAt: Timestamp;
    }[];
    createdAt: Timestamp;
}

export interface Notification {
    id: string;
    userId: string;
    type: "application" | "accepted" | "message" | "collab_request" | "like";
    title: string;
    body: string;
    read: boolean;
    link: string;
    createdAt: Timestamp;
}
