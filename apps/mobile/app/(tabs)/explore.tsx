import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Feather } from '@expo/vector-icons';
import { colors, typography } from '@collabsphere/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ProjectCard } from '../../components/ProjectCard';

import { MOCK_PROJECTS } from '../../src/mock/data';

const FILTERS = ['All', 'React', 'Node', 'Python', 'Design', 'Web3', 'ML', 'Mobile'];

const PROJECTS = MOCK_PROJECTS.map(item => ({
    id: item.id,
    name: item.title,
    description: item.description,
    status: item.status.toUpperCase(),
    tech: item.techStack.map((tech, i) => ({ name: tech, color: ['#3178c6', '#61dafb', '#3572A5'][i % 3] })),
    members: item.teamMembers.length,
    gradient: ['#1e3a8a', '#1e40af'],
}));

export default function ExploreScreen() {
    const [activeFilter, setActiveFilter] = (FILTERS[0]) as any; // Mock state

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Explore</Text>
                <TouchableOpacity>
                    <Feather name="filter" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Feather name="search" size={18} color="#555555" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search projects, skills, people..."
                        placeholderTextColor="#555555"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            <FlashList
                data={PROJECTS}
                ListHeaderComponent={
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filtersScroll}
                    >
                        {FILTERS.map((f) => (
                            <TouchableOpacity
                                key={f}
                                style={[
                                    styles.filterChip,
                                    f === 'All' ? styles.filterActive : styles.filterInactive
                                ]}
                            >
                                <Text style={[
                                    styles.filterText,
                                    f === 'All' ? styles.filterTextActive : styles.filterTextInactive
                                ]}>{f}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }
                renderItem={({ item }) => (
                    <ProjectCard
                        project={item}
                        onApply={(role) => console.log('Applying for', role)}
                    />
                )}
                estimatedItemSize={250}
                contentContainerStyle={styles.listContent}
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
    searchContainer: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        height: 44,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 15,
        fontFamily: 'DMSans_400Regular',
    },
    filtersScroll: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    filterActive: {
        backgroundColor: 'white',
        borderColor: 'white',
    },
    filterInactive: {
        backgroundColor: colors.surfaceHigh,
        borderColor: colors.border,
    },
    filterText: {
        fontSize: 13,
        fontFamily: 'DMSans_500Medium',
    },
    filterTextActive: {
        color: colors.bg,
    },
    filterTextInactive: {
        color: colors.textSecondary,
    },
    listContent: {
        paddingBottom: 20,
    },
    projectCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    projectBanner: {
        height: 120,
        padding: 12,
        alignItems: 'flex-end',
    },
    statusBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    statusText: {
        fontSize: 11,
        fontFamily: 'DMSans_700Bold',
    },
    cardContent: {
        padding: 16,
    },
    projectName: {
        fontSize: 18,
        fontFamily: 'DMSans_700Bold',
        color: 'white',
    },
    projectDesc: {
        fontSize: 13,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
        marginTop: 4,
    },
    techRow: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 12,
    },
    techItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    techDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    techName: {
        fontSize: 12,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    membersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarStack: {
        flexDirection: 'row',
    },
    stackAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.surface,
    },
    memberCount: {
        fontSize: 12,
        color: colors.textMuted,
        fontFamily: 'DMSans_400Regular',
    },
    applyButton: {
        color: colors.accent,
        fontSize: 13,
        fontFamily: 'DMSans_700Bold',
    },
});
