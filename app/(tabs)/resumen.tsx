import React, { useEffect,useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { ThemeContext } from '@/context/themeContext';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { GradientText } from '@/components/GradientText';
import { GradientButton } from '@/components/GradientButton';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Card = ({ title, subtitle, description, index, scrollY, initialRender }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

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
    <Animated.View style={[styles.card, animatedStyle]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </Animated.View>
  );
};

const SkillsSection = ({ title, skills, index, scrollY, initialRender }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

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
    <Animated.View style={[styles.skillsSection, animatedStyle]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.skillsContainer}>
        {skills.map((skill, idx) => (
          <View key={idx} style={styles.skillItem}>
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
  

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    runOnJS(() => initialRender.value = true)();
  }, []);

  const experiences = [
    { title: "Software Developer", subtitle: "Tech Corp, 2019 - Present", description: "Developed and maintained web applications using React and Node.js." },
    { title: "Junior Developer", subtitle: "StartUp Inc, 2017 - 2019", description: "Assisted in the development of mobile applications using React Native." },
  ];

  const education = [
    { title: "Bachelor's in Computer Science", subtitle: "Tech University, 2013 - 2017", description: "Focused on software engineering and web technologies." },
    { title: "High School Diploma", subtitle: "City High School, 2009 - 2013", description: "Excelled in mathematics and computer studies." },
  ];

  const professionalSkills = ["React", "Node.js", "JavaScript", "Python", "Git"];
  const languages = ["English", "Spanish", "French"];

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -50],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <GradientText text="Resume" style={styles.headerText} />
        <GradientButton text="Download" textStyle={{ fontSize: 14, color: 'white', fontWeight: 'bold' }} buttonStyle={styles.downloadButton} />
      </Animated.View>
      
      <AnimatedScrollView 
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((exp, index) => (
            <Card key={index} {...exp} index={index} scrollY={scrollY} initialRender={initialRender.value} />
          ))}

          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <Card key={index} {...edu} index={index + experiences.length} scrollY={scrollY} initialRender={initialRender.value} />
          ))}

          <SkillsSection title="Professional Skills" skills={professionalSkills} index={experiences.length + education.length} scrollY={scrollY} initialRender={initialRender.value} />
          <SkillsSection title="Languages" skills={languages} index={experiences.length + education.length + 1} scrollY={scrollY} initialRender={initialRender.value} />
        </View>
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4af4',
    marginBottom: 10,
  },
  downloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4a4af4',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
  },
  skillsSection: {
    marginTop: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#e0e0ff',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  skillText: {
    color: '#4a4af4',
    fontSize: 12,
  },
});