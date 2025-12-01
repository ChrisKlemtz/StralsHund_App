import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User } from 'lucide-react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, typography, iconSize } from '../../theme';
import authApi from '../../api/auth';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Benutzername ist erforderlich';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Benutzername muss mindestens 3 Zeichen lang sein';
    }

    if (!formData.email) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Passwort muss mindestens 6 Zeichen lang sein';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log('Registration successful:', response);
      setLoading(false);

      Alert.alert(
        'Erfolgreich registriert!',
        'Dein Account wurde erstellt. Du kannst dich jetzt anmelden.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);

      let errorMessage = 'Registrierung fehlgeschlagen. Bitte versuche es erneut.';
      if (error.message) {
        errorMessage = error.message;
      } else if (error.errors) {
        const firstError = Object.values(error.errors)[0];
        errorMessage = firstError;
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.emoji}>🐾</Text>
            <Text style={styles.title}>Account erstellen</Text>
            <Text style={styles.subtitle}>Werde Teil der Community</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Benutzername"
              value={formData.username}
              onChangeText={(value) => handleChange('username', value)}
              placeholder="hundefreund123"
              autoCapitalize="none"
              error={errors.username}
              leftIcon={<User size={iconSize.sm} color={colors.gray[500]} />}
            />

            <Input
              label="E-Mail"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder="deine@email.de"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Mail size={iconSize.sm} color={colors.gray[500]} />}
            />

            <Input
              label="Passwort"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              placeholder="••••••••"
              secureTextEntry
              error={errors.password}
              leftIcon={<Lock size={iconSize.sm} color={colors.gray[500]} />}
            />

            <Input
              label="Passwort bestätigen"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              placeholder="••••••••"
              secureTextEntry
              error={errors.confirmPassword}
              leftIcon={<Lock size={iconSize.sm} color={colors.gray[500]} />}
            />

            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

            <Button
              onPress={handleRegister}
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              style={styles.registerButton}
            >
              Registrieren
            </Button>

            <Text style={styles.termsText}>
              Mit der Registrierung stimmst du unseren{' '}
              <Text style={styles.termsLink}>AGB</Text> und{' '}
              <Text style={styles.termsLink}>Datenschutzrichtlinien</Text> zu.
            </Text>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Bereits registriert? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Anmelden</Text>
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
    marginTop: spacing[6],
    marginBottom: spacing[6],
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
  registerButton: {
    marginTop: spacing[4],
    marginBottom: spacing[3],
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  termsText: {
    ...typography.caption,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary[500],
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing[4],
  },
  loginText: {
    ...typography.body,
    color: colors.gray[600],
  },
  loginLink: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: '600',
  },
});
