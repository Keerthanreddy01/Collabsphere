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
                colors={item.isMe ? [colors.accent, colors.accentSecondary] : ['#222', '#111']}
                style={[styles.storyCircle, !item.isMe && styles.storyUnseenGlass]}
            >
                <View style={styles.storyInner}>
                    <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
                    {item.isMe && (
                        <LinearGradient 
                            colors={[colors.accent, colors.accentSecondary]}
                            style={styles.plusIcon}
                        >
                            <Feather name="plus" size={10} color="white" />
                        </LinearGradient>
                    )}
                </View>
            </LinearGradient>
            <Text style={styles.storyLabel} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <LinearGradient
                colors={[colors.bg, '#0a0a0f', colors.bg]}
                style={StyleSheet.absoluteFill}
            />
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>CollabSphere</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Feather name="bell" size={20} color="white" />
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
                        <BlurView intensity={20} style={styles.postGlass} tint="dark">
                            <View style={styles.postContainer}>
                                <View style={styles.postHeader}>
                                    <View style={styles.avatarGlow}>
                                        <Image source={{ uri: `https://avatar.vercel.sh/${item.author}` }} style={styles.authorAvatar} />
                                    </View>
                                    <View style={styles.authorMeta}>
                                        <Text style={styles.authorName}>{item.author} <Text style={styles.time}>· {item.time}</Text></Text>
                                        <Text style={styles.projectSubtext}>to <Text style={styles.projectName}>{item.project}</Text></Text>
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
                                            <BlurView intensity={10} style={styles.actionIconBlur}>
                                                <Feather name="message-square" size={14} color={colors.textSecondary} />
                                            </BlurView>
                                            <Text style={styles.actionCount}>4</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.postAction}>
                                            <BlurView intensity={10} style={styles.actionIconBlur}>
                                                <Feather name="share-2" size={14} color={colors.textSecondary} />
                                            </BlurView>
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
            <TouchableOpacity style={styles.fabWrapper}>
                <LinearGradient
                    colors={[colors.accent, colors.accentSecondary]}
                    style={styles.fab}
                >
                    <Feather name="edit-3" size={20} color="white" />
                </LinearGradient>
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
        borderBottomColor: colors.borderGlass,
    },
    logo: {
        fontFamily: 'DMSerifDisplay_400Regular',
        fontSize: 24,
        color: 'white',
        letterSpacing: -0.5,
    },
    iconButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: colors.surfaceGlass,
    },
    unreadDot: {
        position: 'absolute',
        right: 8,
        top: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.accent,
        borderWidth: 2,
        borderColor: colors.bg,
    },
    storiesScroll: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16,
    },
    storyContainer: {
        alignItems: 'center',
        width: 76,
    },
    storyCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyInner: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    storyUnseenGlass: {
        opacity: 0.9,
    },
    storyAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.surface,
    },
    plusIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderRadius: 12,
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.bg,
    },
    storyLabel: {
        fontSize: 11,
        color: colors.textSecondary,
        marginTop: 6,
        fontFamily: 'DMSans_500Medium',
    },
    postWrapper: {
        marginHorizontal: 16,
        marginVertical: 10,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.borderGlass,
    },
    postGlass: {
        padding: 16,
        backgroundColor: colors.surfaceGlass,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    avatarGlow: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.borderGlass,
        padding: 1,
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface,
    },
    authorMeta: {
        flex: 1,
    },
    authorName: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'DMSans_700Bold',
    },
    time: {
        color: colors.textMuted,
        fontSize: 12,
        fontFamily: 'DMSans_400Regular',
    },
    projectSubtext: {
        fontSize: 12,
        color: colors.textMuted,
        fontFamily: 'DMSans_400Regular',
        marginTop: 1,
    },
    projectName: {
        color: colors.accent,
        fontFamily: 'DMSans_700Bold',
    },
    postText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24,
        fontFamily: 'DMSans_400Regular',
        opacity: 0.95,
    },
    postImage: {
        width: '100%',
        height: 240,
        borderRadius: 20,
        marginTop: 16,
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
        gap: 6,
    },
    reactionTagGlass: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.borderGlass,
    },
    reactionText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'DMSans_500Medium',
    },
    postActions: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionIconBlur: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surfaceGlass,
        overflow: 'hidden',
    },
    actionCount: {
        color: colors.textSecondary,
        fontSize: 13,
        fontFamily: 'DMSans_500Medium',
    },
    divider: {
        height: 0,
    },
    fabWrapper: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
});
