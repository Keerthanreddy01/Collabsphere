import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@collabsphere/firebase';

export function usePresence(uid: string) {
    const [online, setOnline] = useState(false);
    const [lastSeen, setLastSeen] = useState<number | null>(null);

    useEffect(() => {
        if (!rtdb || !uid) {
            // Default mock presence
            setOnline(true);
            setLastSeen(Date.now());
            return;
        }

        const statusRef = ref(rtdb, `/status/${uid}`);

        return onValue(statusRef, (snap) => {
            const data = snap.val();
            setOnline(data?.online || false);
            setLastSeen(data?.lastSeen || null);
        });
    }, [uid]);

    return { online, lastSeen };
}
