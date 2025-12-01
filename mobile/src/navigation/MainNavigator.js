import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Home, MapPin, Calendar, MessageCircle, User } from 'lucide-react-native';

import HomeScreen from '../screens/main/HomeScreen';
import ExploreScreen from '../screens/main/ExploreScreen';
import MeetupsScreen from '../screens/main/MeetupsScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

import { colors, spacing, iconSize } from '../theme';

const Tab = createBottomTabNavigator();

const TabIcon = ({ Icon, focused }) => (
  <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
    <Icon
      size={iconSize.md}
      color={focused ? colors.primary[500] : colors.gray[400]}
      strokeWidth={focused ? 2.5 : 2}
    />
  </View>
);

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Home} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Entdecken',
          tabBarIcon: ({ focused }) => <TabIcon Icon={MapPin} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Meetups"
        component={MeetupsScreen}
        options={{
          title: 'Treffen',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Calendar} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => <TabIcon Icon={MessageCircle} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => <TabIcon Icon={User} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingBottom: spacing[2],
    paddingTop: spacing[2],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: spacing[1],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    // Could add subtle animation or background
  },
});
