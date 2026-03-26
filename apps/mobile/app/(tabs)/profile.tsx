import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MOCK_USER } from '../../src/mock/data';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroContainer}>
                <LinearGradient
                    colors={['#0f172a', '#1e1b4b', '#312e81']}
                    style={styles.cover}
                />
                <View style={styles.headerContent}>
                    <View style={styles.avatarWrapper}>
                        <LinearGradient
                            colors={[colors.accent, colors.accentSecondary]}
                            style={styles.avatarGlow}
                        >
                            <Image
                                source={{ uri: 'https://avatar.vercel.sh/me' }}
                                style={styles.avatar}
                            />
                        </LinearGradient>
                        <TouchableOpacity style={styles.editAvatar}>
                            <Feather name="camera" size={12} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{MOCK_USER.name}</Text>
                        <View style={styles.usernameRow}>
                            <Text style={styles.username}>@{MOCK_USER.username}</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>PRO</Text>
                            </View>
                        </View>
                        <Text style={styles.bio}>
                            {MOCK_USER.bio}
                        </Text>
                    </View>

                    <View style={styles.statusRow}>
                        {MOCK_USER.openToCollab && (
                            <BlurView intensity={20} tint="dark" style={styles.statusBadge}>
                                <View style={styles.statusDot} />
                                <Text style={styles.statusText}>Open to Collab</Text>
                            </BlurView>
                        )}
                        <TouchableOpacity style={styles.editProfileBtn}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                style={styles.editProfileGradient}
                            >
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsWrapper}>
                <BlurView intensity={10} tint="dark" style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Projects</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>458</Text>
                        <Text style={styles.statLabel}>Contribs</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>🔥 {MOCK_USER.streak}</Text>
                        <Text style={styles.statLabel}>Streak</Text>
                    </View>
                </BlurView>
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.skillsScroll}>
                    {MOCK_USER.skills.map((skill) => (
                        <View key={skill} style={styles.skillChip}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Pinned Projects */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Pinned Projects</Text>
                    <Feather name="chevron-right" size={16} color="#555555" />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pinnedScroll}>
                    {[1, 2].map((i) => (
                        <View key={i} style={styles.pinnedCard}>
                            <LinearGradient colors={['#312e81', '#4338ca']} style={styles.pinnedBanner} />
                            <View style={styles.pinnedContent}>
                                <Text style={styles.pinnedName}>Nexus Chat</Text>
                                <View style={styles.pinnedStatus}>
                                    <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
                                    <Text style={styles.pinnedStatusText}>Building</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    cover: {
        height: 160,
        width: '100%',
    },
    heroContainer: {
        backgroundColor: colors.bg,
        paddingBottom: 20,
    },
    headerContent: {
        paddingHorizontal: 16,
        alignItems: 'center',
        marginTop: -50,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarGlow: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    avatar: {
        width: 94,
        height: 94,
        borderRadius: 47,
        borderWidth: 4,
        borderColor: colors.bg,
        backgroundColor: colors.surface,
    },
    editAvatar: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: colors.accent,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.bg,
    },
    userInfo: {
        alignItems: 'center',
        marginTop: 12,
    },
    name: {
        fontSize: 22,
        fontFamily: 'DMSans_700Bold',
        color: 'white',
    },
    usernameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },
    username: {
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: 'DMSans_500Medium',
    },
    badge: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    badgeText: {
        color: colors.accent,
        fontSize: 10,
        fontFamily: 'DMSans_700Bold',
    },
    bio: {
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 22,
        paddingHorizontal: 30,
        opacity: 0.8,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 12,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.borderGlass,
        overflow: 'hidden',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.success,
        shadowColor: colors.success,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    statusText: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'DMSans_500Medium',
    },
    editProfileBtn: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.borderGlass,
        overflow: 'hidden',
    },
    editProfileGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    editProfileText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'DMSans_500Medium',
    },
    statsWrapper: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.borderGlass,
        overflow: 'hidden',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontFamily: 'DMSans_700Bold',
        color: 'white',
    },
    statLabel: {
        fontSize: 11,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
        marginTop: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: colors.border,
    },
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    skillsScroll: {
        paddingHorizontal: 16,
        gap: 8,
    },
    skillChip: {
        backgroundColor: colors.surface,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    skillText: {
        color: colors.textSecondary,
        fontSize: 13,
        fontFamily: 'DMSans_500Medium',
    },
    pinnedScroll: {
        paddingHorizontal: 16,
        gap: 12,
    },
    pinnedCard: {
        width: 200,
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    pinnedBanner: {
        height: 60,
    },
    pinnedContent: {
        padding: 10,
    },
    pinnedName: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'DMSans_700Bold',
    },
    pinnedStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    pinnedStatusText: {
        fontSize: 11,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
    },
});
