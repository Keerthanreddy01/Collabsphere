import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const MOCK_MESSAGES = [
    { id: '1', senderId: 'alice', text: 'Hey! How is the mobile app coming along?', time: '10:00 AM', isMe: false },
    { id: '2', senderId: 'me', text: 'Going great! Just finished the feed and explore screens.', time: '10:05 AM', isMe: true },
    { id: '3', senderId: 'alice', text: 'Awesome. Can we start the integration today?', time: '10:10 AM', isMe: false, replyTo: { text: 'Just finished the feed and explore screens.' } },
    { id: '4', senderId: 'me', text: 'Definitely. I\'ll be online in 30 mins.', time: '10:11 AM', isMe: true },
];

export default function ChatScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="chevron-left" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: 'https://avatar.vercel.sh/alice' }} style={styles.headerAvatar} />
                        <View style={styles.onlineDot} />
                    </View>
                    <View>
                        <Text style={styles.headerName}>Alice Carter</Text>
                        <Text style={styles.onlineStatus}>Online</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="video" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="info" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlashList
                data={[...MOCK_MESSAGES].reverse()}
                inverted
                renderItem={({ item }) => (
                    <View style={[styles.messageRow, item.isMe ? styles.rowMe : styles.rowThem]}>
                        <View style={[
                            styles.bubble,
                            item.isMe ? styles.bubbleMe : styles.bubbleThem
                        ]}>
                            {item.replyTo && (
                                <View style={styles.replyBox}>
                                    <View style={styles.replyBar} />
                                    <Text style={styles.replyText} numberOfLines={1}>{item.replyTo.text}</Text>
                                </View>
                            )}
                            <Text style={[styles.messageText, item.isMe ? styles.textMe : styles.textThem]}>
                                {item.text}
                            </Text>
                        </View>
                        <Text style={[styles.timestamp, item.isMe ? styles.timeMe : styles.timeThem]}>
                            {item.time}
                        </Text>
                    </View>
                )}
                estimatedItemSize={80}
                contentContainerStyle={styles.listContent}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.inputBar}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Feather name="paperclip" size={20} color="#555555" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Message..."
                        placeholderTextColor="#555555"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, message.trim() ? styles.sendActive : styles.sendInactive]}
                    >
                        <Feather
                            name={message.trim() ? "arrow-up" : "mic"}
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1c1c1c',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarContainer: {
        position: 'relative',
    },
    headerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    onlineDot: {
        position: 'absolute',
        bottom: -1,
        right: -1,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.success,
        borderWidth: 2,
        borderColor: colors.bg,
    },
    headerName: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'DMSans_700Bold',
    },
    onlineStatus: {
        color: colors.success,
        fontSize: 11,
        fontFamily: 'DMSans_400Regular',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 16,
    },
    headerIcon: {
        padding: 4,
    },
    listContent: {
        padding: 16,
    },
    messageRow: {
        marginBottom: 16,
        maxWidth: '80%',
    },
    rowMe: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    rowThem: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    bubble: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
    },
    bubbleMe: {
        backgroundColor: colors.accent,
        borderBottomRightRadius: 4,
    },
    bubbleThem: {
        backgroundColor: '#1c1c1c',
        borderBottomLeftRadius: 4,
    },
    replyBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 8,
        borderRadius: 8,
        marginBottom: 6,
        gap: 8,
    },
    replyBar: {
        width: 2,
        backgroundColor: 'white',
        borderRadius: 1,
    },
    replyText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'DMSans_400Regular',
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'DMSans_400Regular',
        lineHeight: 20,
    },
    textMe: {
        color: 'white',
    },
    textThem: {
        color: 'white',
    },
    timestamp: {
        fontSize: 10,
        color: colors.textMuted,
        marginTop: 4,
    },
    timeMe: {
        marginRight: 4,
    },
    timeThem: {
        marginLeft: 4,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: '#1c1c1c',
        backgroundColor: colors.bg,
    },
    attachButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: 'white',
        fontSize: 15,
        maxHeight: 100,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendActive: {
        backgroundColor: colors.accent,
    },
    sendInactive: {
        backgroundColor: colors.surfaceHigh,
    },
});
