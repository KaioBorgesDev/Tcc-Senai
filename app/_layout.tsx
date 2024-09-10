import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {AuthProvider} from '../context/AuthContext'
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      router.push('/SignIn');
      SplashScreen.hideAsync();
      
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="SignUp" options={{headerShown: false}}/>
        <Stack.Screen name="SignIn" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
      
    
  );
}
