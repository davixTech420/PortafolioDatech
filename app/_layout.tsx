import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ThemeProvider} from '@/context/themeContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import 'react-native-reanimated';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      
    </ThemeProvider>
    
  );
}
