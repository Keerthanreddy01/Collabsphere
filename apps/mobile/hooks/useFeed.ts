import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@collabsphere/firebase';
import { ProjectUpdate } from '@collabsphere/types';
import { MOCK_FEED } from '../src/mock/data';

export function useFeed(limitCount = 20) {
    const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setUpdates(MOCK_FEED as any);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'updates'),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        return onSnapshot(q, (snap) => {
            setUpdates(snap.docs.map(d => ({ id: d.id, ...d.data() } as ProjectUpdate)));
            setLoading(false);
        });
    }, [limitCount]);

    return { updates, loading };
}
