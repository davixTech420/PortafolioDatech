import React, { createContext, useState, useCallback } from 'react';
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme,View,StatusBar,SafeAreaView,StyleSheet,Platform } from 'react-native';

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

  const backgroundColor = '#fff';
  const CustomStatusBar = React.memo(({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  ));


  return (
<>
      {Platform.OS === 'android' && (
        <CustomStatusBar backgroundColor={theme === 'dark' ? "#151718" : "white"} barStyle={theme =="dark"? "light-content": "dark-content"} />
      )}
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
    </>


  );
};
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
export { ThemeProvider, ThemeContext };
