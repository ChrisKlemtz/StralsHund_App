import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>💬</Text>
        <Text style={styles.title}>Nachrichten</Text>
        <Text style={styles.subtitle}>
          Chatte mit anderen Hundebesitzern und bleibe mit der Community in Kontakt.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[8],
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[3],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
  },
});
