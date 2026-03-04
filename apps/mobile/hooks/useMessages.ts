import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@collabsphere/firebase';
import { Message } from '@collabsphere/types';

export function useMessages(conversationId: string) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!db || !conversationId) return;

        const q = query(
            collection(db, `conversations/${conversationId}/messages`),
            orderBy('createdAt', 'asc'),
            limit(50)
        );

        return onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() } as Message)));
        });
    }, [conversationId]);

    return { messages };
}
