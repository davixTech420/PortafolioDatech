/* import { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';
import { Button } from 'react-native';
const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Button 
    title={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
     onPress={toggleTheme} />
  );
};

export default ToggleThemeButton; */
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '@/context/themeContext';
import { Ionicons } from 'react-native-vector-icons';

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        toggleTheme();
        setPressed(!pressed);
      }}
    >
      <Ionicons
        name={theme === 'dark' ? (pressed ? 'sunny' : 'sunny') : (pressed ? 'moon' : 'moon')}
        size={24}
        color={theme === 'dark' ? '#fff' : '#000'}
      />
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;