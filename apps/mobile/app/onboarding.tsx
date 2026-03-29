import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, typography } from '@collabsphere/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SKILLS = ['React', 'Node', 'Python', 'TypeScript', 'Figma', 'Flutter', 'Swift', 'Rust', 'Go', 'Web3', 'ML', 'DevOps'];

export default function OnboardingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [intent, setIntent] = useState('');
    const [profile, setProfile] = useState({ name: '', bio: '', username: '' });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const [loading, setLoading] = useState(false);

    const handleComplete = async () => {
        if (!profile.name) return;
        setLoading(true);
        try {
            // TODO: Replace with backend API call to save user profile
            // const response = await fetch('/api/onboarding', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         name: profile.name,
            //         username: profile.username,
            //         bio: profile.bio,
            //         role,
            //         skills: selectedSkills,
            //         intent
            //     })
            // });
            
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 5:
                return (
                    <Animated.View entering={FadeInRight} style={styles.stepContainer}>
                        <Text style={styles.title}>Profile Setup</Text>
                        <View style={styles.profileSection}>
                            <TouchableOpacity style={styles.avatarPicker}>
                                <Image source={{ uri: 'https://avatar.vercel.sh/placeholder' }} style={styles.bigAvatar} />
                                <View style={styles.cameraIcon}>
                                    <Feather name="camera" size={16} color="white" />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Your name"
                                    placeholderTextColor="#555555"
                                    value={profile.name}
                                    onChangeText={(t) => setProfile({ ...profile, name: t, username: t.toLowerCase().replace(/ /g, '_') })}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Username</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="username"
                                    placeholderTextColor="#555555"
                                    value={profile.username}
                                    onChangeText={(t) => setProfile({ ...profile, username: t })}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Bio</Text>
                                <TextInput
                                    style={[styles.input, styles.bioInput]}
                                    placeholder="Tell others what you're building..."
                                    placeholderTextColor="#555555"
                                    multiline
                                    numberOfLines={3}
                                    value={profile.bio}
                                    onChangeText={(t) => setProfile({ ...profile, bio: t })}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.continueButton, (!profile.name || loading) && styles.disabledButton]}
                            onPress={handleComplete}
                            disabled={loading}
                        >
                            <Text style={styles.continueButtonText}>{loading ? 'Saving...' : 'Start Building →'}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            case 1:
                return (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
                        <View style={styles.logoBadge}>
                            <Feather name="layers" size={24} color="white" />
                        </View>
                        <Text style={styles.heroTitle}>Build Together.</Text>
                        <Text style={styles.heroSubtext}>Find your people. Ship real projects. Join the sphere of creators.</Text>

                        <BlurView intensity={20} style={styles.glassCard}>
                            <View style={styles.authButtons}>
                                <TouchableOpacity style={styles.githubButton} onPress={nextStep}>
                                    <Feather name="github" size={20} color="black" />
                                    <Text style={styles.githubButtonText}>Continue with GitHub</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.googleButton} onPress={nextStep}>
                                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} style={styles.googleIcon} />
                                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                                </TouchableOpacity>
                            </View>
                        </BlurView>

                        <Text style={styles.termsText}>By continuing you agree to our Terms</Text>
                    </Animated.View>
                );
            case 2:
                return (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
                        <Text style={styles.title}>What describes you best?</Text>
                        <View style={styles.grid}>
                            {['Student', 'Developer', 'Designer', 'Entrepreneur'].map((r) => (
                                <TouchableOpacity
                                    key={r}
                                    style={[styles.roleCard, role === r && styles.selectedCard]}
                                    onPress={() => setRole(r)}
                                >
                                    <Text style={[styles.roleEmoji]}>{r === 'Student' ? '🎓' : r === 'Developer' ? '👨‍💻' : r === 'Designer' ? '🎨' : '🚀'}</Text>
                                    <Text style={[styles.roleText, role === r && styles.selectedText]}>{r}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={[styles.continueButton, !role && styles.disabledButton]}
                            disabled={!role}
                            onPress={nextStep}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            case 3:
                return (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
                        <Text style={styles.title}>What do you know?</Text>
                        <Text style={styles.hintText}>Select at least 3 for better matches</Text>
                        <ScrollView contentContainerStyle={styles.skillsGrid} showsVerticalScrollIndicator={false}>
                            {SKILLS.map((skill) => (
                                <TouchableOpacity
                                    key={skill}
                                    style={[styles.skillChip, selectedSkills.includes(skill) && styles.selectedChip]}
                                    onPress={() => toggleSkill(skill)}
                                >
                                    <Text style={[styles.skillChipText, selectedSkills.includes(skill) && styles.selectedChipText]}>{skill}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={[styles.continueButton, selectedSkills.length === 0 && styles.disabledButton]}
                            disabled={selectedSkills.length === 0}
                            onPress={nextStep}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            case 4:
                return (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
                        <Text style={styles.title}>What are you here for?</Text>
                        <View style={styles.intentList}>
                            {[
                                { id: 'join', text: '🔍 Find a project to join' },
                                { id: 'post', text: '📢 Post my project + find teammates' },
                                { id: 'both', text: '🤝 Both' }
                            ].map((i) => (
                                <TouchableOpacity
                                    key={i.id}
                                    style={[styles.intentCard, intent === i.id && styles.selectedCard]}
                                    onPress={() => setIntent(i.id)}
                                >
                                    <Text style={[styles.intentText, intent === i.id && styles.selectedText]}>{i.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={[styles.continueButton, !intent && styles.disabledButton]}
                            disabled={!intent}
                            onPress={nextStep}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            default:
                return null;
        }
    };

    return (
        <ImageBackground
            source={require('../assets/images/onboarding_bg.png')}
            style={styles.bgImage}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    {step > 1 ? (
                        <TouchableOpacity onPress={prevStep} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                    ) : <View style={{ width: 40 }} />}

                    <View style={styles.progressContainer}>
                        {[1, 2, 3, 4, 5].map((s) => (
                            <View key={s} style={[styles.dot, step >= s && styles.activeDot]} />
                        ))}
                    </View>

                    {(step === 3 || step === 4) ? (
                        <TouchableOpacity onPress={nextStep}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    ) : <View style={{ width: 40 }} />}
                </View>

                <View style={styles.content}>
                    {renderStep()}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 20,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    activeDot: {
        backgroundColor: 'white',
        width: 30,
    },
    skipText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontFamily: 'DMSans_500Medium',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logoBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    heroTitle: {
        fontFamily: 'DMSerifDisplay_400Regular',
        fontSize: 56,
        color: 'white',
        lineHeight: 60,
        marginBottom: 16,
    },
    heroSubtext: {
        fontFamily: 'DMSans_400Regular',
        fontSize: 18,
        color: colors.textSecondary,
        lineHeight: 28,
        marginBottom: 40,
    },
    glassCard: {
        padding: 24,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginBottom: 40,
    },
    title: {
        fontFamily: 'DMSerifDisplay_400Regular',
        fontSize: 28,
        color: 'white',
        marginBottom: 24,
    },
    authButtons: {
        gap: 16,
    },
    githubButton: {
        backgroundColor: 'white',
        height: 54,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    githubButtonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
    },
    googleButton: {
        borderWidth: 1,
        borderColor: '#333',
        height: 54,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    googleButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
    },
    termsText: {
        color: colors.textMuted,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'DMSans_400Regular',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    roleCard: {
        width: (width - 64) / 2,
        backgroundColor: colors.surface,
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedCard: {
        borderColor: 'white',
        backgroundColor: '#1c1c1c',
    },
    roleEmoji: {
        fontSize: 32,
    },
    roleText: {
        color: colors.textSecondary,
        fontSize: 15,
        fontFamily: 'DMSans_700Bold',
    },
    selectedText: {
        color: 'white',
    },
    continueButton: {
        backgroundColor: 'white',
        height: 54,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    disabledButton: {
        backgroundColor: '#333',
    },
    continueButtonText: {
        color: colors.bg,
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
    },
    hintText: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 20,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    skillChip: {
        backgroundColor: colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectedChip: {
        backgroundColor: 'white',
        borderColor: 'white',
    },
    skillChipText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontFamily: 'DMSans_500Medium',
    },
    selectedChipText: {
        color: colors.bg,
    },
    intentList: {
        gap: 16,
    },
    intentCard: {
        padding: 24,
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    intentText: {
        color: colors.textSecondary,
        fontSize: 16,
        fontFamily: 'DMSans_700Bold',
    },
    profileSection: {
        alignItems: 'center',
        gap: 20,
    },
    avatarPicker: {
        position: 'relative',
    },
    bigAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.accent,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.bg,
    },
    inputGroup: {
        width: '100%',
        gap: 8,
    },
    label: {
        color: colors.textSecondary,
        fontSize: 13,
        fontFamily: 'DMSans_700Bold',
    },
    input: {
        width: '100%',
        backgroundColor: colors.surface,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 16,
        color: 'white',
        fontFamily: 'DMSans_400Regular',
        borderWidth: 1,
        borderColor: colors.border,
    },
    bioInput: {
        height: 100,
        paddingTop: 12,
    },
});
