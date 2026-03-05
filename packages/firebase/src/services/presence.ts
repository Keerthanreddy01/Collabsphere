import { ref, set, onDisconnect, serverTimestamp, onValue } from "firebase/database";
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

export const getPresence = (uid: string, callback: (presence: { online: boolean; lastSeen: number }) => void) => {
    if (!rtdb) return () => { };
    const statusRef = ref(rtdb, `/status/${uid}`);
    return onValue(statusRef, (snapshot) => {
        const val = snapshot.val();
        callback(val || { online: false, lastSeen: 0 });
    });
};
