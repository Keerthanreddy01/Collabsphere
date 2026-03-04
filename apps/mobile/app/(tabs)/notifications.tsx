import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTIFS = [
    {
        id: '1',
        type: 'application',
        text: 'Alice Carter wants to join <Text style={styles.bold}>Nexus Chat</Text> as React Dev',
        time: '2h ago',
        read: false,
        icon: 'user-plus',
        iconBg: '#1a3a5c',
    },
    {
        id: '2',
        type: 'accepted',
        text: 'Your application to <Text style={styles.bold}>Solana Pay</Text> was accepted! 🎉',
        time: '5h ago',
        read: true,
        icon: 'check',
        iconBg: '#14532d',
    },
    {
        id: '3',
        type: 'message',
        text: 'Marcus Vane sent you a message',
        time: '1d ago',
        read: true,
        icon: 'message-circle',
        iconBg: '#1f1f1f',
    },
];

export default function NotificationsScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={styles.markRead}>Mark all read</Text>
                </TouchableOpacity>
            </View>

            <FlashList
                data={NOTIFS}
                ListHeaderComponent={<Text style={styles.sectionTitle}>Today</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.notifRow, !item.read && styles.unreadRow]}>
                        <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                            <Feather name={item.icon as any} size={18} color="white" />
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.notifText}>
                                {item.type === 'application' ? (
                                    <Text>Alice Carter wants to join <Text style={styles.accentText}>Nexus Chat</Text> as React Dev</Text>
                                ) : item.type === 'accepted' ? (
                                    <Text>Your application to <Text style={styles.accentText}>Solana Pay</Text> was accepted! 🎉</Text>
                                ) : (
                                    <Text>{item.text}</Text>
                                )}
                            </Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>

                        <TouchableOpacity style={styles.moreButton}>
                            <Feather name="more-horizontal" size={16} color="#555555" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                estimatedItemSize={80}
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
    markRead: {
        color: colors.accent,
        fontSize: 14,
        fontFamily: 'DMSans_500Medium',
    },
    sectionTitle: {
        color: colors.textSecondary,
        fontSize: 13,
        fontFamily: 'DMSans_700Bold',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#0d0d0d',
    },
    notifRow: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1c1c1c',
    },
    unreadRow: {
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    notifText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'DMSans_400Regular',
        lineHeight: 18,
    },
    accentText: {
        color: colors.accent,
        fontFamily: 'DMSans_700Bold',
    },
    time: {
        color: colors.textMuted,
        fontSize: 12,
        fontFamily: 'DMSans_400Regular',
        marginTop: 4,
    },
    moreButton: {
        padding: 4,
    },
    bold: {
        fontFamily: 'DMSans_700Bold',
    }
});
