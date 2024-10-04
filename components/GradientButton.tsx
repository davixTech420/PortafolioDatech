import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export function GradientButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}  activeOpacity={0.7}>
      <LinearGradient
        colors={['#4200ff', '#a200ff', '#bd00ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[props.buttonStyle, { justifyContent: 'center', alignItems: 'center' }]} // Fondo degradado para el botón
      >
        <Text style={[props.textStyle]}>
          {props.text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
