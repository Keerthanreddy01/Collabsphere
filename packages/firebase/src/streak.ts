import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./config";
import { User } from "@collabsphere/types";

export const updateStreak = async (uid: string) => {
    if (!db) return;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data() as User;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (!userData.streak) {
        await updateDoc(userRef, {
            streak: {
                count: 1,
                lastActiveDate: serverTimestamp()
            }
        });
        return;
    }

    const lastActive = userData.streak.lastActiveDate.toDate();
    const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate()).getTime();

    const diffInDays = (today - lastActiveDay) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
        // Consecutive day
        await updateDoc(userRef, {
            "streak.count": userData.streak.count + 1,
            "streak.lastActiveDate": serverTimestamp()
        });
    } else if (diffInDays > 1) {
        // Streak broken
        await updateDoc(userRef, {
            "streak.count": 1,
            "streak.lastActiveDate": serverTimestamp()
        });
    }
    // If diffInDays === 0, already active today, do nothing.
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
