import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "@/context/themeContext";
import GradientIcon from "@/components/GradientIcon";
import { Ionicons } from "react-native-vector-icons";

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleTheme();
        setPressed(!pressed);
      }}
    >
      <GradientIcon name={theme === "dark" ? "sunny" : "moon"} />
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;
