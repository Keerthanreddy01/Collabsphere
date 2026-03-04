import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useNotifications(userId: string | undefined) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!db || !userId) return;

        const q = query(
            collection(db, 'notifications'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        return onSnapshot(q, (snap) => {
            const notifs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setNotifications(notifs);
            setUnreadCount(notifs.filter((n: any) => !n.read).length);
        });
    }, [userId]);

    const markAllAsRead = async () => {
        if (!db || !userId) return;
        const batch = writeBatch(db);
        notifications.forEach(n => {
            if (!n.read) {
                batch.update(doc(db, 'notifications', n.id), { read: true });
            }
        });
        await batch.commit();
    };

    return { notifications, unreadCount, markAllAsRead };
}
