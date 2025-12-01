import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';

import Card from '../../components/Card';
import { colors, spacing, typography, iconSize } from '../../theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hallo, Hundefreund! 👋</Text>
            <Text style={styles.subtitle}>Was möchtest du heute entdecken?</Text>
          </View>
          <Bell size={iconSize.md} color={colors.gray[700]} />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <QuickActionCard
            emoji="🗺️"
            title="Neue Route"
            subtitle="Gassi-Route erstellen"
            color={colors.primary[50]}
          />
          <QuickActionCard
            emoji="🏡"
            title="Treffplätze"
            subtitle="Private Spots finden"
            color={colors.secondary[50]}
          />
        </View>

        {/* Feed Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          <Card style={styles.card}>
            <Text style={styles.placeholderText}>
              Coming soon: Hier siehst du Posts von anderen Hundebesitzern in deiner Nähe.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickActionCard({ emoji, title, subtitle, color }) {
  return (
    <Card style={[styles.quickActionCard, { backgroundColor: color }]} elevation="sm">
      <Text style={styles.quickActionEmoji}>{emoji}</Text>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[5],
    backgroundColor: colors.white,
  },
  greeting: {
    ...typography.h3,
    color: colors.gray[900],
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.gray[600],
    marginTop: spacing[1],
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[5],
    gap: spacing[4],
  },
  quickActionCard: {
    flex: 1,
    padding: spacing[4],
    alignItems: 'center',
  },
  quickActionEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  quickActionTitle: {
    ...typography.label,
    fontWeight: '600',
    color: colors.gray[900],
    textAlign: 'center',
  },
  quickActionSubtitle: {
    ...typography.caption,
    color: colors.gray[600],
    textAlign: 'center',
    marginTop: spacing[1],
  },
  section: {
    paddingHorizontal: spacing[6],
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.gray[900],
    marginBottom: spacing[4],
  },
  card: {
    padding: spacing[5],
  },
  placeholderText: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
  },
});
