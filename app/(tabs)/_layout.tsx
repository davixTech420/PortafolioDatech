import { Tabs } from "expo-router";
import { useContext } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";
import ToggleThemeButton from "@/components/BotonTheme";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import GradientIcon from "@/components/GradientIcon";

export default function TabLayout() {
  const tema = useContext(ThemeContext).theme;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#9100e3",
        tabBarInactiveTintColor: Colors[tema].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[tema].backgroundTab, // Fondo de la barra de pestañas
          left: 35,
          right: 35,
          bottom: 8,
          position: "absolute",
          borderRadius: 14,
        },
        headerShown: false,
      }}
    >
      
      <Tabs.Screen
        name="resumen"
        options={{
          title: "Resumen",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "newspaper" : "newspaper-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="proyects"
        options={{
          title: "Proyectos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />








<Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
















      <Tabs.Screen
        name="contact"
        options={{
          title: "Contactame",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbubble-sharp" : "chatbubble-outline"}
              color={color}
            />
          ),
        }}
      />






      <Tabs.Screen
        name="theme"
        options={{
          title: tema === "light" ? "oscuro" : "claro",
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
