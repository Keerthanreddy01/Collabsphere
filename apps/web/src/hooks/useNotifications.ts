import { useEffect, useState } from 'react';
import { Notification } from '@collabsphere/types';

// TODO: Replace with actual backend API call

export function useNotifications(userId: string | undefined) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!userId) return;

        // TODO: Fetch notifications from backend API
        // const response = await fetch(`/api/notifications?userId=${userId}`);
        // const data = await response.json();
        // setNotifications(data);
        // setUnreadCount(data.filter((n: Notification) => !n.read).length);

        // For now, return empty array
        setNotifications([]);
        setUnreadCount(0);
    }, [userId]);

    const markAllAsRead = async () => {
        if (!userId) return;
        
        // TODO: Call backend API to mark all as read
        // await fetch(`/api/notifications/mark-all-read`, {
        //     method: 'POST',
        //     body: JSON.stringify({ userId })
        // });
    };

    return { notifications, unreadCount, markAllAsRead };
}
