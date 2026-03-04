import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

import { MOCK_FEED, MOCK_USER } from '../../src/mock/data';

const STORIES = [
    { id: 'me', name: 'Update', avatar: 'https://github.com/identicons/user.png', isMe: true },
    { id: 'p1', name: 'nexus-chat', avatar: 'https://avatar.vercel.sh/nexus' },
    { id: 'p2', name: 'eco-track', avatar: 'https://avatar.vercel.sh/eco' },
    { id: 'p3', name: 'solana-pay', avatar: 'https://avatar.vercel.sh/solana' },
];

const FEED_DATA = MOCK_FEED.map(item => ({
    id: item.id,
    author: item.authorName,
    project: item.projectName,
    text: item.content,
    time: '5m', // Simplified for mock
    image: (item as any).image || null,
    reactions: { '👍': item.likes.length, '🔥': 2 }
}));

export default function FeedScreen() {
    const renderStory = (item: any) => (
        <TouchableOpacity key={item.id} style={styles.storyContainer}>
            <LinearGradient
                colors={item.isMe ? [colors.accent, '#4338ca'] : ['#555', '#333']}
                style={[styles.storyCircle, !item.isMe && styles.storyUnseenGlass]}
            >
                <BlurView intensity={30} style={styles.storyBlur}>
                    <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
                    {item.isMe && (
                        <View style={styles.plusIcon}>
                            <Feather name="plus" size={12} color="white" />
                        </View>
                    )}
                </BlurView>
            </LinearGradient>
            <Text style={styles.storyLabel} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>CollabSphere</Text>
                <TouchableOpacity>
                    <Feather name="bell" size={22} color="white" />
                    <View style={styles.unreadDot} />
                </TouchableOpacity>
            </View>

            <FlashList
                data={FEED_DATA}
                ListHeaderComponent={
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.storiesScroll}
                    >
                        {STORIES.map(renderStory)}
                    </ScrollView>
                }
                renderItem={({ item }) => (
                    <View style={styles.postWrapper}>
                        <BlurView intensity={10} style={styles.postGlass}>
                            <View style={styles.postContainer}>
                                <View style={styles.postHeader}>
                                    <View style={styles.avatarGlow}>
                                        <Image source={{ uri: `https://avatar.vercel.sh/${item.author}` }} style={styles.authorAvatar} />
                                    </View>
                                    <View style={styles.authorMeta}>
                                        <Text style={styles.authorName}>{item.author} <Text style={styles.time}>· {item.time}</Text></Text>
                                        <Text style={styles.projectSubtext}>posted update to <Text style={styles.projectName}>{item.project}</Text></Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Feather name="more-horizontal" size={18} color={colors.textMuted} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.postText}>{item.text}</Text>

                                {item.image && (
                                    <Image source={{ uri: item.image }} style={styles.postImage} />
                                )}

                                <View style={styles.actionRow}>
                                    <View style={styles.reactions}>
                                        {Object.entries(item.reactions).map(([emoji, count]) => (
                                            <Pressable key={emoji} style={styles.reactionTagGlass}>
                                                <Text style={styles.reactionText}>{emoji} {count}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                    <View style={styles.postActions}>
                                        <TouchableOpacity style={styles.postAction}>
                                            <Feather name="message-square" size={14} color={colors.textSecondary} />
                                            <Text style={styles.actionCount}>4</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.postAction}>
                                            <Feather name="share-2" size={14} color={colors.textSecondary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </BlurView>
                    </View>
                )}
                estimatedItemSize={250}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />

            {/* FAB */}
            <TouchableOpacity style={styles.fab}>
                <Feather name="edit-3" size={20} color="white" />
            </TouchableOpacity>
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
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    logo: {
        fontFamily: 'DMSerifDisplay_400Regular',
        fontSize: 22,
        color: 'white',
    },
    unreadDot: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.danger,
        borderWidth: 1.5,
        borderColor: colors.bg,
    },
    storiesScroll: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 16,
    },
    storyContainer: {
        alignItems: 'center',
        width: 72,
    },
    storyCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyBlur: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    storyUnseenGlass: {
        opacity: 0.8,
    },
    storyAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.surface,
    },
    plusIcon: {
        position: 'absolute',
        right: 18,
        bottom: 18,
        backgroundColor: colors.accent,
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    storyLabel: {
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 4,
        fontFamily: 'DMSans_400Regular',
    },
    postWrapper: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    postGlass: {
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    postContainer: {
        // Wrapper for content padding
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    avatarGlow: {
        borderRadius: 18,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    authorAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface,
    },
    authorMeta: {
        flex: 1,
    },
    authorName: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'DMSans_500Medium',
    },
    time: {
        color: colors.textMuted,
        fontSize: 13,
    },
    projectSubtext: {
        fontSize: 12,
        color: colors.textMuted,
        fontFamily: 'DMSans_400Regular',
    },
    projectName: {
        color: colors.textSecondary,
        fontFamily: 'DMSans_700Bold',
    },
    postText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 22,
        fontFamily: 'DMSans_400Regular',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 12,
        backgroundColor: colors.surface,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    reactions: {
        flexDirection: 'row',
        gap: 8,
    },
    reactionTagGlass: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    reactionText: {
        fontSize: 13,
        color: 'white',
    },
    postActions: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionCount: {
        color: colors.textSecondary,
        fontSize: 13,
    },
    divider: {
        height: 1,
        backgroundColor: 'transparent',
        marginHorizontal: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
