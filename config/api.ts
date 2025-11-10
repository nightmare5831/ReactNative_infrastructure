import { Platform } from 'react-native';

// API Configuration

export const API_CONFIG = {
  BASE_URL: Platform.select({
    android: 'https://track-app-backend-0njr.onrender.com/api',
    ios: 'https://track-app-backend-0njr.onrender.com/api',
    web: 'https://track-app-backend-0njr.onrender.com/api',
    default: 'https://track-app-backend-0njr.onrender.com/api',
  }),
  TIMEOUT: 10000,
};

// Alternative URLs for reference
export const API_URLS = {
  RENDER_PRODUCTION: 'https://track-app-backend-0njr.onrender.com/api',
  ANDROID_EMULATOR: 'http://10.0.2.2:8000/api',
  IOS_SIMULATOR: 'http://localhost:8000/api',
  LOCALHOST: 'http://localhost:8000/api',
  WEB: 'http://localhost:8000/api',
  PHYSICAL_DEVICE: 'http://192.168.1.100:8000/api', // Update with your computer's IP
};
