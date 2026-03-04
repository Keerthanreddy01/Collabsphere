import { ref, set, onDisconnect, serverTimestamp } from "firebase/database";
import { rtdb } from "../config";

export const setUserPresence = (uid: string) => {
    if (!rtdb) return;

    const statusRef = ref(rtdb, `/status/${uid}`);

    // Set online status
    set(statusRef, {
        online: true,
        lastSeen: serverTimestamp()
    });

    // Set offline status on disconnect
    onDisconnect(statusRef).set({
        online: false,
        lastSeen: serverTimestamp()
    });
};
