import { useState } from 'react';
import { User } from '@collabsphere/types';
import { MOCK_USER } from '../constants/mock-data';

// TODO: Replace with actual backend auth logic

export function useAuth() {
    // For now, return mock user
    const [user] = useState<any>(null);
    const [profile] = useState<User | null>(MOCK_USER as any);
    const [loading] = useState(false);

    return { user, profile, loading };
}
