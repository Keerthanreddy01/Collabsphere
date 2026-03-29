import { useState } from 'react';

// TODO: Replace with actual backend presence system

export function usePresence(uid: string) {
    const [online] = useState(true);
    const [lastSeen] = useState<number | null>(Date.now());

    // TODO: Implement presence tracking via backend API or WebSocket
    // useEffect(() => {
    //     if (!uid) return;
    //     const url = `/api/presence/${uid}`;
    //     const eventSource = new EventSource(url);
    //     eventSource.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         setOnline(data.online);
    //         setLastSeen(data.lastSeen);
    //     };
    //     return () => eventSource.close();
    // }, [uid]);

    return { online, lastSeen };
}
