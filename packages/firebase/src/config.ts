import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
};

export let auth: any = null;
export let db: any = null;
export let storage: any = null;
export let rtdb: any = null;

try {
    const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'dummy-api-key';

    if (isConfigValid) {
        const app = getApps().length === 0
            ? initializeApp(firebaseConfig)
            : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        rtdb = getDatabase(app);
    } else {
        console.log('Firebase dummy config detected, using mock mode');
    }
} catch (e) {
    console.log('Firebase not configured, using mock mode');
}
