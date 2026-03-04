import {
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    onSnapshot,
    increment,
    arrayUnion
} from "firebase/firestore";
import { db } from "../config";
import { Message, Conversation } from "@collabsphere/types";

// SEND MESSAGE
export const sendMessage = async (
    conversationId: string,
    senderId: string,
    recipientId: string,
    text: string,
    replyTo?: { messageId: string, text: string, senderName: string }
) => {
    if (!db) return;

    const msgRef = collection(db, `conversations/${conversationId}/messages`);

    const newMsg = {
        senderId,
        text,
        replyTo: replyTo || null,
        reactions: {},
        readBy: [senderId],
        createdAt: serverTimestamp(),
        edited: false
    };

    const docRef = await addDoc(msgRef, newMsg);

    // Update conversation's lastMessage
    await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: { text, senderId, timestamp: serverTimestamp() },
        lastMessageAt: serverTimestamp(),
        [`unreadCount.${recipientId}`]: increment(1)
    });

    return docRef.id;
};

// LISTEN TO MESSAGES (real-time)
export const listenMessages = (
    conversationId: string,
    callback: (messages: Message[]) => void
) => {
    if (!db) return () => { };

    const q = query(
        collection(db, `conversations/${conversationId}/messages`),
        orderBy('createdAt', 'asc'),
        limit(50)
    );

    return onSnapshot(q, (snap) => {
        const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Message));
        callback(msgs);
    });
};

// MARK AS READ
export const markRead = (conversationId: string, uid: string) => {
    if (!db) return;
    updateDoc(doc(db, 'conversations', conversationId), {
        [`unreadCount.${uid}`]: 0
    });
};

// ADD REACTION
export const addReaction = (conversationId: string, messageId: string, emoji: string, uid: string) => {
    if (!db) return;
    updateDoc(
        doc(db, `conversations/${conversationId}/messages/${messageId}`),
        { [`reactions.${emoji}`]: arrayUnion(uid) }
    );
};
