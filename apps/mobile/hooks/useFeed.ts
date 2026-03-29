import { useState } from 'react';
import { ProjectUpdate } from '@collabsphere/types';
import { MOCK_FEED } from '../constants/mock-data';

// TODO: Replace with actual backend API call

export function useFeed(limitCount = 20) {
    const [updates] = useState<ProjectUpdate[]>(MOCK_FEED as any);
    const [loading] = useState(false);

    // TODO: Implement feed fetching from backend API
    // useEffect(() => {
    //     const fetchFeed = async () => {
    //         const response = await fetch(`/api/feed?limit=${limitCount}`);
    //         const data = await response.json();
    //         setUpdates(data);
    //         setLoading(false);
    //     };
    //     fetchFeed();
    // }, [limitCount]);

    return { updates, loading };
}
