import { Platform } from 'react-native';

// API Configuration
const getApiUrl = () => {
  // Web Browser: localhost
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/api/v1';
  }

  // Android Emulator: 10.0.2.2
  if (Platform.OS === 'android' && !__DEV__) {
    return 'http://10.0.2.2:5000/api/v1';
  }

  // iOS Simulator, Expo Go, or physical devices: WSL IP
  return 'http://172.29.40.113:5000/api/v1';
};

export const API_URL = getApiUrl();

export default {
  API_URL,
  TIMEOUT: 10000, // 10 Sekunden
};
