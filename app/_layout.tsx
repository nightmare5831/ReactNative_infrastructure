import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAppStore } from '../store/useAppStore';
import '../global.css';

export default function RootLayout() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const checkAuth = useAppStore((state) => state.checkAuth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && segments[0] !== 'login' && segments[0] !== 'register') {
      router.replace('/login');
    } else if (isAuthenticated && (segments[0] === 'login' || segments[0] === 'register')) {
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
