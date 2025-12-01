import { Platform } from 'react-native';

// API Configuration
const getApiUrl = () => {
  // Für Expo Go auf physischem Gerät: Verwende WSL IP-Adresse
  // Für iOS Simulator: localhost
  // Für Android Emulator: 10.0.2.2

  if (Platform.OS === 'android' && !__DEV__) {
    return 'http://10.0.2.2:5000/api/v1';
  }

  // Verwende WSL IP für physische Geräte und Expo Go
  return 'http://172.29.40.113:5000/api/v1';
};

export const API_URL = getApiUrl();

export default {
  API_URL,
  TIMEOUT: 10000, // 10 Sekunden
};
