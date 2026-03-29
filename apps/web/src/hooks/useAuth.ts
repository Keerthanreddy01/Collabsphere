import { useContext } from 'react';
import { useAuth as useAuthFromProvider } from '@/providers/AuthProvider';
import { User } from '@collabsphere/types';

// TODO: Replace with actual backend auth logic

export function useAuth() {
    // Use the auth context from AuthProvider
    const authContext = useAuthFromProvider();
    
    return {
        user: authContext.user,
        profile: authContext.profile as User | null,
        loading: authContext.loading
    };
}
