import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence
} from 'react-native-reanimated';
import { colors } from '@collabsphere/types';

interface BuildPulseProps {
    count: number;
}

export const BuildPulse: React.FC<BuildPulseProps> = ({ count }) => {
    const opacity = useSharedValue(0.4);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 800 }),
                withTiming(0.4, { duration: 800 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: opacity.value * 1.5 }],
    }));

    if (count === 0) return null;

    return (
        <View style={styles.container}>
            <View style={styles.dotContainer}>
                <Animated.View style={[styles.pulseDot, animatedStyle]} />
                <View style={styles.staticDot} />
            </View>
            <Text style={styles.text}>{count} building now</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dotContainer: {
        width: 8,
        height: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    staticDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.success,
    },
    pulseDot: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.success,
    },
    text: {
        fontSize: 11,
        color: colors.success,
        fontFamily: 'DMSans_500Medium',
    },
});
