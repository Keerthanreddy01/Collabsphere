import { useEffect, useState } from 'react';
import { ProjectUpdate } from '@collabsphere/types';

// TODO: Replace with actual backend API call

export function useFeed(limitCount = 20) {
    const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch updates from backend API
        // const response = await fetch(`/api/updates?limit=${limitCount}`);
        // const data = await response.json();
        // setUpdates(data);
        
        // For now, return empty array
        setUpdates([]);
        setLoading(false);
    }, [limitCount]);

    return { updates, loading };
}
