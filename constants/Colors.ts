/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { BackHandler } from "react-native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundTab: '#151718',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: 'white',
    tabIconSelected: tintColorLight,
    backgroundCard: '#F8F8F8',
  },
  dark: {
    text: '#ECEDEE', 
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    backgroundTab: 'white',
    tabIconDefault: 'black',
    tabIconSelected: tintColorLight,
    backgroundCard: '#1A1C1E',
  },
};
