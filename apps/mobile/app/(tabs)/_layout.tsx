import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@collabsphere/types';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#555555',
                tabBarStyle: {
                    backgroundColor: colors.bg,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'DMSans_500Medium',
                },
                headerStyle: {
                    backgroundColor: colors.bg,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                },
                headerTitleStyle: {
                    color: colors.textPrimary,
                    fontFamily: 'DMSans_700Bold',
                    fontSize: 18,
                },
                headerTitleAlign: 'left',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Feed',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Feather name="home" size={22} color={color} />
                        </View>
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <Feather name="compass" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Feather name="message-circle" size={22} color={color} />
                            {/* Badge placeholder */}
                            <View style={{
                                position: 'absolute',
                                right: -4,
                                top: -2,
                                backgroundColor: colors.danger,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                borderWidth: 1.5,
                                borderColor: colors.bg
                            }} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifs',
                    tabBarIcon: ({ color }) => <Feather name="bell" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
