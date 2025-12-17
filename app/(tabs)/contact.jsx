import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
  Alert
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GradientText } from "@/components/GradientText";
import { GradientButton } from "@/components/GradientButton";
import { ThemeContext } from "@/context/themeContext";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
    }
  }, [error]);

  const formAnimation = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const formStyle = useAnimatedStyle(() => {
    return {
      opacity: formAnimation.value,
      transform: [{ translateY: (1 - formAnimation.value) * 50 }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleSubmit = () => {
if (!name || !message) {
  setError('Por favor, rellena todos los campos');
  setVisible(true);
  return;
}
    buttonScale.value = withTiming(0.95, { duration: 100 }, () => {
      buttonScale.value = withTiming(1, { duration: 100 });
    });
    const phoneNumber = '+573021134179'; // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=Hola, mi nombre es ${name}. ${message}`;
    const webWhatsAppURL = `https://wa.me/${phoneNumber}?text=Hola, mi nombre es ${name}. ${message}`;

    if (Platform.OS === 'web') {
      // Si es web, abrimos WhatsApp Web
      window.open(webWhatsAppURL, '_blank');
    } else {
      // Si es móvil, verificamos si WhatsApp está instalado
      Linking.canOpenURL(whatsappURL)
        .then(supported => {
          if (supported) {
            return Linking.openURL(whatsappURL); // Abrir la app de WhatsApp en móvil
          } else {
            Alert.alert(
              'WhatsApp no está instalado',
              'Por favor, instala WhatsApp para poder enviar el mensaje.'
            );
          }
        })
        .catch(err => {
          Alert.alert("Error al intentar abrir WhatsApp", err);
        });
    }
  };
  useEffect(() => {
    formAnimation.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const tema = useContext(ThemeContext).theme;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container,{ backgroundColor: Colors[tema].background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.form, formStyle,{ backgroundColor: Colors[tema].backgroundCard }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✉️</Text>
          </View>
          <GradientText text="Contactame" style={styles.title} />
          <Text style={styles.subtitle}>Vamos Hacer Historia Juntos!</Text>
          {visible && error && (
        <Text style={{ backgroundColor: 'red', color: 'white', padding: 10 }}>
          {error}
        </Text>
      )}
          <TextInput
            style={[styles.input,{ backgroundColor: Colors[tema].background, color: Colors[tema].text }]}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0AEC0"
            required
          />
          
          <TextInput
            style={[styles.input, styles.messageInput,{ backgroundColor: Colors[tema].background, color: Colors[tema].text }]}
            placeholder="Mensaje"
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#A0AEC0"
          />
          <GradientButton
            text="Enviar"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={handleSubmit}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  form: {
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
   
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    paddingTop: 12,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});