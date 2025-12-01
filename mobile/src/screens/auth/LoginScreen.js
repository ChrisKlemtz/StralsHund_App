import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, typography, iconSize } from '../../theme';
import { useAuthStore } from '../../store/authStore';
import authApi from '../../api/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const setAuth = useAuthStore((state) => state.setAuth);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (password.length < 6) {
      newErrors.password = 'Passwort muss mindestens 6 Zeichen lang sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authApi.login(email, password);
      console.log('Login successful:', response);
      
      const { accessToken, refreshToken, user } = response.data;
      await setAuth({ user, accessToken, refreshToken });
      
      setLoading(false);
      // Navigation is handled automatically by RootNavigator
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      
      let errorMessage = 'Login fehlgeschlagen. Bitte versuche es erneut.';
      if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>🐕</Text>
            <Text style={styles.title}>Willkommen zurück!</Text>
            <Text style={styles.subtitle}>Melde dich an, um fortzufahren</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="E-Mail"
              value={email}
              onChangeText={setEmail}
              placeholder="deine@email.de"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Mail size={iconSize.sm} color={colors.gray[500]} />}
            />

            <Input
              label="Passwort"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              error={errors.password}
              leftIcon={<Lock size={iconSize.sm} color={colors.gray[500]} />}
            />

            <TouchableOpacity onPress={() => {}} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
            </TouchableOpacity>

            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

            <Button
              onPress={handleLogin}
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              style={styles.loginButton}
            >
              Anmelden
            </Button>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>oder</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialButtons}>
            <Button variant="secondary" size="lg" fullWidth onPress={() => {}}>
              Mit Google anmelden
            </Button>
            <Button variant="secondary" size="lg" fullWidth onPress={() => {}}>
              Mit Apple anmelden
            </Button>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Noch kein Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Registrieren</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[8],
  },
  header: {
    alignItems: 'center',
    marginTop: spacing[8],
    marginBottom: spacing[8],
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[600],
  },
  form: {
    marginBottom: spacing[6],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[6],
  },
  forgotPasswordText: {
    ...typography.bodySmall,
    color: colors.primary[500],
    fontWeight: '500',
  },
  loginButton: {
    marginTop: spacing[2],
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[300],
  },
  dividerText: {
    ...typography.bodySmall,
    color: colors.gray[500],
    marginHorizontal: spacing[4],
  },
  socialButtons: {
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing[4],
  },
  signupText: {
    ...typography.body,
    color: colors.gray[600],
  },
  signupLink: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: '600',
  },
});
