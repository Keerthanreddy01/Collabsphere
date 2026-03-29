import { useState } from 'react';
import { Message } from '@collabsphere/types';

// TODO: Replace with actual backend API call

export function useMessages(conversationId: string) {
    const [messages] = useState<Message[]>([]);

    // TODO: Implement message fetching from backend API
    // useEffect(() => {
    //     if (!conversationId) return;
    //     const fetchMessages = async () => {
    //         const response = await fetch(`/api/conversations/${conversationId}/messages`);
    //         const data = await response.json();
    //         setMessages(data);
    //     };
    //     fetchMessages();
    // }, [conversationId]);

    return { messages };
}
