 import { Tabs } from 'expo-router';
import React, { useState,useContext } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import ToggleThemeButton from '@/components/BotonTheme';
export default function TabLayout() {
  const tema =  useContext(ThemeContext).theme;  
  return (    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[tema].tabIconSelected,
        tabBarInactiveTintColor: Colors[tema].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[tema].background, // Fondo de la barra de pestañas
          left:50,
          right:50,
          bottom:5,
          position:"absolute",
          borderRadius:50,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'peguelo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <ToggleThemeButton/>
     
    </Tabs>
  );
} 