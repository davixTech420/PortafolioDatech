import React, { useEffect, useCallback,useContext } from 'react';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ThemeProvider,ThemeContext } from "@/context/themeContext";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView, Platform, StatusBar, View, StyleSheet } from 'react-native';



SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
   
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
<SafeAreaView style={[styles.container, { backgroundColor: "white" }]} onLayout={onLayoutRootView}>

        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
        </SafeAreaView>
  
  ); 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  statusBar: {
    height: StatusBar.currentHeight,
  },
});
