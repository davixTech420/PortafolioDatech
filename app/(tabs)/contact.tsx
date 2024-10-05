import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
    buttonScale.value = withTiming(0.95, { duration: 100 }, () => {
      buttonScale.value = withTiming(1, { duration: 100 });
    });
    // Here you would typically handle the form submission
    console.log("Form submitted:", { name, email, message });
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
          <Text style={styles.title}>Get in touch</Text>
          <Text style={styles.subtitle}>Let's work together!</Text>

          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A0AEC0"
          />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#A0AEC0"
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#A0AEC0"
          />
          <GradientButton
            text="Submit"
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
    backgroundColor: "#EDF2F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#2D3748",
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
