/* import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
export function GradientText(props){
    return(
        <MaskedView maskElement={<Text style={[props.style, {backgroundColor:'transparent',color:"linear-gradient(#4200ff, #a200ff, #bd00ff"}]} >{props.text}</Text>}>
            <LinearGradient
            colors={['#4200ff', '#a200ff', '#bd00ff']}
            start={{ x:0, y:0  }}
            end={{ x:1, y:1 }}
            >
                <Text style={[props.style, {opacity:0 }]} >{props.text}</Text>
            </LinearGradient>
        </MaskedView>
    );
}
    */
import React from 'react';
import { Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export function GradientText({ text, style }) {
  if (Platform.OS === 'web') {
    return (
      <span
        style={{
          background: 'linear-gradient(45deg, #4200ff, #a200ff, #bd00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          ...style,
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>
      }
    >
      <LinearGradient
        colors={['#4200ff', '#a200ff', '#bd00ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}