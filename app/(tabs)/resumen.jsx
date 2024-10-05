/*propiedad de Datech*/
import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GradientText } from "@/components/GradientText";
import { GradientButton } from "@/components/GradientButton";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Card = ({
  title,
  subtitle,
  description,
  index,
  scrollY,
  initialRender,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const tema = useContext(ThemeContext).theme;
  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, [initialRender]);

  const animatedStyle = useAnimatedStyle(() => {
    const scrollOpacity = interpolate(
      scrollY.value,
      [-1, 0, 200 * index, 200 * (index + 1)],
      [1, 1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity.value * scrollOpacity,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
        { backgroundColor: Colors[tema].backgroundCard },
      ]}
    >
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>
      <ThemedText style={styles.cardDescription}>{description}</ThemedText>
    </Animated.View>
  );
};

const SkillsSection = ({ title, skills, index, scrollY, initialRender }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const tema = useContext(ThemeContext).theme;
  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, [initialRender]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[ animatedStyle, { marginBottom:45  } ]}>
      <GradientText text={title} style={styles.sectionTitle} />
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View
            key={index}
            style={[
              styles.skillItem,
              { backgroundColor: Colors[tema].backgroundCard },
            ]}
          >
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

export default function ModernAnimatedResume() {
  const scrollY = useSharedValue(0);
  const initialRender = useSharedValue(false);

  const tema = useContext(ThemeContext).theme;
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    runOnJS(() => (initialRender.value = true))();
  }, []);

  const experiences = [
    { title: "N/A", subtitle: " ", description: "  " },
    /* { title: "Junior Developer", subtitle: "StartUp Inc, 2017 - 2019", description: "Assisted in the development of mobile applications using React Native." }, */
  ];

  const education = [
    {
      title: "Tecnologo En Desarrollo De Software",
      subtitle: "SENA, 2024 - 2025",
      description: "Practicas De Tecnologias Emergentes Y Desarrollo Web",
    },
    {
      title: "Tecnico En Desarrollo De Software",
      subtitle: "Coletio Tecnico ARP, 2022 - 2023",
      description:
        "Bases sólidas en programación y desarrollo de aplicaciones.",
    },
  ];

  const professionalSkills = [
    "Linux",
    "Git",
    "Api",
    "Seguridad Web",
  ];
  const languages = ["PHP", "Laravel", "JavaScript", "React","Express JS","Python","MySql","CSS","Tailwind"];
  const { theme } = useContext(ThemeContext);
  return (
    <ThemedView style={styles.container}>
      <AnimatedScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <ThemedView
          style={[
            styles.header,
            { borderBottomColor: Colors[theme].backgroundTab },
          ]}
        >
          <GradientText text="Resumen" style={styles.headerText} />
          <GradientButton
            text="Descargar"
            textStyle={{ fontSize: 14, color: "white", fontWeight: "bold" }}
            buttonStyle={styles.downloadButton}
          />
        </ThemedView>
        <ThemedView style={styles.content}>
          <GradientText text="Experiencia" style={styles.sectionTitle} />
          {experiences.map((exp, index) => (
            <Card
              key={index}
              {...exp}
              index={index}
              scrollY={scrollY}
              initialRender={initialRender.value}
            />
          ))}

          <GradientText text="Educacion" style={styles.sectionTitle} />
          {education.map((edu, index) => (
            <Card
              key={index}
              {...edu}
              index={index + experiences.length}
              scrollY={scrollY}
              initialRender={initialRender.value}
            />
          ))}

          <SkillsSection
            title="Skills"
            skills={professionalSkills}
            index={experiences.length + education.length}
            scrollY={scrollY}
            initialRender={initialRender.value}
          />
          <SkillsSection
            title="Lenguajes"
            skills={languages}
            index={experiences.length + education.length + 1}
            scrollY={scrollY}
            initialRender={initialRender.value}
          />
        </ThemedView>
      </AnimatedScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 20,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",

    marginBottom: 10,
  },
  downloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,

    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
  },
  skillsContainer: {
  
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  skillText: {
    color: "#4a4af4",
    fontWeight: "bold",
    fontSize: 12,
  },
});
/*propiedad de datech*/