import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@collabsphere/types';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    useAnimatedGestureHandler
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { BuildPulse } from './BuildPulse';

interface ProjectCardProps {
    project: any;
    onApply: (role: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onApply }) => {
    const translateX = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            // Only allow swiping left to show roles
            translateX.value = Math.min(0, ctx.startX + event.translateX);
        },
        onEnd: (_) => {
            if (translateX.value < -100) {
                translateX.value = withSpring(-150);
            } else {
                translateX.value = withSpring(0);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Background Roles View (Revealed on Swipe) */}
            <View style={styles.rolesContainer}>
                <Text style={styles.rolesTitle}>Open Roles</Text>
                <View style={styles.rolesList}>
                    {['React Dev', 'UI Designer'].map((role) => (
                        <TouchableOpacity
                            key={role}
                            style={styles.roleChip}
                            onPress={() => onApply(role)}
                        >
                            <Text style={styles.roleText}>{role} +</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Reanimated.View style={[styles.card, animatedStyle]}>
                    <LinearGradient
                        colors={project.gradient || ['#1e1b4b', '#312e81']}
                        style={styles.banner}
                    >
                        <View style={styles.bannerHeader}>
                            <BuildPulse count={3} />
                            <View style={[
                                styles.statusBadge,
                                { borderColor: project.status === 'BUILDING' ? colors.success : colors.accent }
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    { color: project.status === 'BUILDING' ? colors.success : colors.accent }
                                ]}>{project.status}</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={styles.content}>
                        <Text style={styles.name}>{project.name}</Text>
                        <Text style={styles.desc} numberOfLines={2}>{project.description}</Text>

                        <View style={styles.footer}>
                            <View style={styles.techRow}>
                                {project.tech.map((t: any, i: number) => (
                                    <View key={i} style={styles.techItem}>
                                        <View style={[styles.techDot, { backgroundColor: t.color }]} />
                                        <Text style={styles.techName}>{t.name}</Text>
                                    </View>
                                ))}
                            </View>
                            <Text style={styles.swipeHint}>Swipe left to apply ←</Text>
                        </View>
                    </View>
                </Reanimated.View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginBottom: 16,
        position: 'relative',
        backgroundColor: colors.accent,
        borderRadius: 16,
    },
    rolesContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 150,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rolesTitle: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'DMSans_700Bold',
        marginBottom: 8,
    },
    rolesList: {
        gap: 8,
        width: '100%',
    },
    roleChip: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    roleText: {
        color: 'white',
        fontSize: 11,
        fontFamily: 'DMSans_500Medium',
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    banner: {
        height: 100,
        padding: 12,
    },
    bannerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
    content: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontFamily: 'DMSans_700Bold',
        color: 'white',
    },
    desc: {
        fontSize: 13,
        color: colors.textSecondary,
        fontFamily: 'DMSans_400Regular',
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    techRow: {
        flexDirection: 'row',
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
    swipeHint: {
        fontSize: 10,
        color: colors.textMuted,
        fontFamily: 'DMSans_400Regular',
    },
});
