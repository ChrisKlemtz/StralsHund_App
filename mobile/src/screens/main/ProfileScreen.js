import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';

import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuthStore } from '../../store/authStore';
import { colors, spacing, typography, iconSize } from '../../theme';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🐕</Text>
          </View>
          <Text style={styles.username}>{user?.username || 'Hundefreund'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <StatCard value="0" label="Routen" />
          <StatCard value="0" label="Treffen" />
          <StatCard value="0" label="Freunde" />
        </View>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <MenuItem title="Meine Hunde" emoji="🐾" />
          <MenuItem title="Statistiken" emoji="📊" />
          <MenuItem title="Einstellungen" emoji="⚙️" />
          <MenuItem title="Premium werden" emoji="⭐" />
        </Card>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onPress={handleLogout}
          icon={<LogOut size={iconSize.sm} color={colors.error} style={{ marginRight: spacing[2] }} />}
          textStyle={{ color: colors.error }}
        >
          Abmelden
        </Button>
      </View>
    </SafeAreaView>
  );
}

function StatCard({ value, label }) {
  return (
    <Card style={styles.statCard} elevation="sm">
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

function MenuItem({ title, emoji }) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuItemEmoji}>{emoji}</Text>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <Text style={styles.menuItemArrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    backgroundColor: colors.white,
    marginHorizontal: -spacing[6],
    marginBottom: spacing[6],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  avatarText: {
    fontSize: 40,
  },
  username: {
    ...typography.h3,
    color: colors.gray[900],
    marginBottom: spacing[1],
  },
  email: {
    ...typography.bodySmall,
    color: colors.gray[600],
  },
  stats: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  statCard: {
    flex: 1,
    padding: spacing[4],
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: colors.primary[500],
    marginBottom: spacing[1],
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray[600],
  },
  menuCard: {
    padding: 0,
    marginBottom: spacing[6],
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemEmoji: {
    fontSize: 20,
    marginRight: spacing[3],
  },
  menuItemText: {
    ...typography.body,
    color: colors.gray[900],
  },
  menuItemArrow: {
    fontSize: 24,
    color: colors.gray[400],
  },
});
