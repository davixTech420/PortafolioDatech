 import { Tabs } from 'expo-router';
import React, { useState,useContext } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import ToggleThemeButton from '@/components/BotonTheme';
import { View } from 'react-native';
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
          title: 'Resumen',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="theme"
        options={{
          title: tema === 'light' ? 'oscuro' : 'claro',
          tabBarIcon: () => <ToggleThemeButton />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            
          },
        }}
      />
{/* <Tabs.Screen
        name="theme"
        options={{
          title: '',
          tabBarIcon: () => <ToggleThemeButton />,
        }}
      /> */}

   
          
       
     
      
     
    </Tabs>
  );
} 