import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@collabsphere/firebase';
import { User } from '@collabsphere/types';
import { MOCK_USER } from '../src/mock/data';

export function useAuth() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth || !db) {
            // Use mock user in mock mode
            setProfile(MOCK_USER as any);
            setUser({ uid: MOCK_USER.uid, displayName: MOCK_USER.name } as any);
            setLoading(false);
            return;
        }

        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (snap.exists()) {
                    setProfile(snap.data() as User);
                }
                setUser(firebaseUser);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });
    }, []);

    return { user, profile, loading };
}
