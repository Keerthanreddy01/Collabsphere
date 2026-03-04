import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { MOCK_MESSAGES } from '../../src/mock/data';

const CONVERSATIONS = MOCK_MESSAGES.map(item => ({
    id: item.id,
    name: item.otherUser.name,
    avatar: item.otherUser.avatar || `https://avatar.vercel.sh/${item.otherUser.name.replace(/\s+/g, '')}`,
    lastMessage: item.lastMessage.text,
    time: '2h ago',
    unreadCount: item.unread,
    online: item.otherUser.online,
    isTeam: item.participants.length > 2,
}));

export default function MessagesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Messages</Text>
                <TouchableOpacity>
                    <Feather name="edit-2" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabRow}>
                <TouchableOpacity style={styles.tabActive}>
                    <Text style={styles.tabTextActive}>Direct</Text>
                    <View style={styles.activeIndicator} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabInactive}>
                    <Text style={styles.tabTextInactive}>Teams</Text>
                </TouchableOpacity>
            </View>

            <FlashList
                data={CONVERSATIONS}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatRow}
                        onPress={() => router.push(`/chat/${item.id}`)}
                    >
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            {item.online && <View style={styles.onlineDot} />}
                        </View>

                        <View style={styles.chatContent}>
                            <View style={styles.chatHeader}>
                                <Text style={[styles.chatName, item.unreadCount > 0 && styles.unreadText]}>
                                    {item.name}
                                </Text>
                                <Text style={styles.chatTime}>{item.time}</Text>
                            </View>

                            <View style={styles.chatFooter}>
                                <Text
                                    style={[styles.lastMessage, item.unreadCount > 0 && styles.unreadMessage]}
                                    numberOfLines={1}
                                >
                                    {item.lastMessage}
                                </Text>
                                {item.unreadCount > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                estimatedItemSize={80}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    title: {
        fontSize: 24,
        fontFamily: 'DMSans_700Bold',
        color: 'white',
    },
    tabRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    tabActive: {
        paddingVertical: 12,
        position: 'relative',
    },
    tabInactive: {
        paddingVertical: 12,
    },
    tabTextActive: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'DMSans_700Bold',
    },
    tabTextInactive: {
        color: '#555555',
        fontSize: 15,
        fontFamily: 'DMSans_500Medium',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'white',
    },
    chatRow: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.surface,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.success,
        borderWidth: 2,
        borderColor: colors.bg,
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'DMSans_500Medium',
    },
    unreadText: {
        fontFamily: 'DMSans_700Bold',
    },
    chatTime: {
        fontSize: 12,
        color: '#555555',
        fontFamily: 'DMSans_400Regular',
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: 13,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
    },
    unreadMessage: {
        color: 'white',
        fontFamily: 'DMSans_500Medium',
    },
    unreadBadge: {
        backgroundColor: colors.accent,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    unreadCount: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'DMSans_700Bold',
    },
    separator: {
        height: 1,
        backgroundColor: colors.surfaceHigh,
        marginLeft: 78,
    },
});
