import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { TabBarIcon } from './navigation/TabBarIcon';
import { Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

function GradientIcon(props:any) {
  if (Platform.OS === 'web') {
    return ( 
      <>
        <TabBarIcon  name={props.name} style={[props.style, { color: '#a200ff' }]} 
        />
      </>
    );
  }
  return (
    <MaskedView
      maskElement={
        <TabBarIcon name={props.name} style={[props.style, { backgroundColor: 'transparent' }]} />
      }
    >
      <LinearGradient
        colors={["blue", '#4200ff', '#a200ff', '#bd00ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TabBarIcon name={props.name} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientIcon;


