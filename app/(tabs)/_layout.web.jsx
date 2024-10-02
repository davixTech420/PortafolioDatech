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
          top:5,
          left:50,
          right:50,
          position:"absolute",
          backgroundColor: Colors[tema].background, // Fondo de la barra de pestañas
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
          title: 'explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      /> 

      <Tabs.Screen
        name="theme"
        options={{
          title:'',
          tabBarIcon: () => <ToggleThemeButton />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            
          },
        }}
      />    
    </Tabs>
  );
} 