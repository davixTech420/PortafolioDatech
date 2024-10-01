import React, { createContext, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Detecta el esquema de colores del dispositivo
 const colorScheme = useColorScheme();

  // Inicializa el estado con el tema del dispositivo
  const [theme, setTheme] = useState( colorScheme === 'dark' ? 'dark' : "light" );

  // Función para alternar entre el tema oscuro y claro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
