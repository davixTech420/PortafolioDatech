import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '@/context/themeContext';
import { Ionicons } from 'react-native-vector-icons';

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
      <Ionicons
        name={theme === 'dark' ? (pressed ? 'sunny' : 'sunny') : (pressed ? 'moon' : 'moon')}
        size={24}
        color={theme === 'dark' ? '#fff' : '#000'}
      />
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;