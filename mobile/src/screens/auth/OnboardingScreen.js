import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[colors.primary[400], colors.primary[600]]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo/Illustration */}
          <View style={styles.imageContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoEmoji}>🐕</Text>
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Willkommen bei StralsHund</Text>
            <Text style={styles.subtitle}>
              Die Community-App für Hundebesitzer. Finde Gassi-Routen, triff andere Hundefreunde
              und entdecke hundefreundliche Orte in deiner Nähe.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <FeatureItem emoji="🗺️" text="Gassi-Routen entdecken" />
            <FeatureItem emoji="🏡" text="Private Hundetreffplätze" />
            <FeatureItem emoji="👥" text="Community Meetups" />
            <FeatureItem emoji="🔍" text="Vermisste Hunde finden" />
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => navigation.navigate('Register')}
              variant="secondary"
              size="lg"
              fullWidth
              style={styles.button}
            >
              Account erstellen
            </Button>

            <Button
              onPress={() => navigation.navigate('Login')}
              variant="ghost"
              size="lg"
              fullWidth
              textStyle={styles.loginButtonText}
            >
              Bereits registriert? Anmelden
            </Button>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

function FeatureItem({ emoji, text }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: 'space-between',
    paddingVertical: spacing[8],
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: spacing[8],
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 64,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: spacing[8],
  },
  title: {
    ...typography.h2,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 26,
  },
  featuresContainer: {
    marginVertical: spacing[6],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: 12,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: spacing[3],
  },
  featureText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '500',
  },
  buttonsContainer: {
    gap: spacing[3],
  },
  button: {
    backgroundColor: colors.white,
  },
  loginButtonText: {
    color: colors.white,
  },
});
