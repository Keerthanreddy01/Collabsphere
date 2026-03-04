import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_USER } from '../../src/mock/data';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <LinearGradient
                colors={['#1e1b4b', '#312e81']}
                style={styles.cover}
            />

            <View style={styles.headerContent}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={{ uri: 'https://avatar.vercel.sh/me' }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editAvatar}>
                        <Feather name="camera" size={14} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.name}>{MOCK_USER.name}</Text>
                    <Text style={styles.username}>@{MOCK_USER.username}</Text>
                    <Text style={styles.bio}>
                        {MOCK_USER.bio}
                    </Text>
                </View>

                <View style={styles.statusRow}>
                    {MOCK_USER.openToCollab && (
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Open to Collab</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.editProfileBtn}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
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
        height: 180,
        width: '100%',
    },
    headerContent: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    avatarWrapper: {
        marginTop: -40,
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: colors.bg,
        backgroundColor: colors.surface,
    },
    editAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
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
    username: {
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
        marginTop: 2,
    },
    bio: {
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 20,
        paddingHorizontal: 20,
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
        backgroundColor: '#1c1c1c',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.success,
    },
    statusText: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'DMSans_500Medium',
    },
    editProfileBtn: {
        backgroundColor: colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    editProfileText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'DMSans_500Medium',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
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
