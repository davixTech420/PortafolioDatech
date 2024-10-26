import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GradientText } from "@/components/GradientText";
import { ThemeContext } from "@/context/themeContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ProjectCard = ({
  title,
  description,
  styleCard,
  styleCardContent,
  styleImagePlaceholder,
}) => (
  <View style={[styles.card, styleCard]}>
    <View style={[styles.cardContent, styleCardContent]}>
      <ThemedText style={styles.projectTitle}>{title}</ThemedText>
      <ThemedText style={styles.projectDescription}>{description}</ThemedText>
    </View>
    <View style={[styles.imagePlaceholder, styleImagePlaceholder]} />
  </View>
);

export default function ProjectShowcase() {
  const buttonAnimation = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonAnimation.value }],
    };
  });

  const handlePress = () => {
    buttonAnimation.value = withSpring(0.9, {}, (finished) => {
      if (finished) {
        buttonAnimation.value = withSpring(1);
      }
    });
  router.navigate("/contact");
  };
  const tema = useContext(ThemeContext).theme;
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[tema].background }]}
    >
      <View style={styles.content}>
        <GradientText text="Proyectos" style={styles.title} />
        <ProjectCard
        styleCard={{backgroundColor:Colors[tema].backgroundCard}}
          title="Project Name 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <ProjectCard
        styleCard={{backgroundColor:Colors[tema].backgroundCard}}
          title="Project Name 2"
          description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </View>
      <LinearGradient colors={["#4200ff", "#a200ff", "#bd00ff"]} style={styles.footer}>
        <Text style={styles.footerText}>Demos Vida A Las Ideas</Text>
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Contactame</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "web" ? 40 : 0,
  },
  content: {
    padding: 20,
    minHeight: SCREEN_HEIGHT - 200, // Adjust this value to control the purple section size
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: "#666666",
  },
  imagePlaceholder: {
    width: 100,
    backgroundColor: "#E0E0E0",
  },
  footer: {
    padding: 20,
    alignItems: "center",

    ...Platform.select({
      android: {
        marginBottom: 60,
      }
      
    })
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#6200EE",
    fontWeight: "bold",
  },
});
