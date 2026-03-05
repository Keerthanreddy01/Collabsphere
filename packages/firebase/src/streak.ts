import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./config";
import { User } from "@collabsphere/types";

export const updateStreak = async (uid: string) => {
    if (!db) return null;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null;

    const userData = userSnap.data() as User;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (!userData.streak) {
        const initialStreak = {
            count: 1,
            lastActiveDate: serverTimestamp()
        };
        await updateDoc(userRef, { streak: initialStreak });
        return 1;
    }

    const lastActive = userData.streak.lastActiveDate.toDate();
    const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate()).getTime();

    const diffInDays = Math.floor((today - lastActiveDay) / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
        // Consecutive day
        const newCount = userData.streak.count + 1;
        await updateDoc(userRef, {
            "streak.count": newCount,
            "streak.lastActiveDate": serverTimestamp()
        });
        return newCount;
    } else if (diffInDays > 1) {
        // Streak broken
        await updateDoc(userRef, {
            "streak.count": 1,
            "streak.lastActiveDate": serverTimestamp()
        });
        return 1;
    }

    // Already active today
    return userData.streak.count;
};

export const checkStreakReset = async (uid: string) => {
    if (!db) return;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data() as User;
    if (!userData.streak) return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const lastActive = userData.streak.lastActiveDate.toDate();
    const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate()).getTime();

    const diffInDays = (today - lastActiveDay) / (1000 * 60 * 60 * 24);

    if (diffInDays > 1) {
        await updateDoc(userRef, {
            "streak.count": 0
        });
    }
};
