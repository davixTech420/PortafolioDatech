import { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';
import { ThemeContext } from '@/context/themeContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Component() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;
const tema = useContext(ThemeContext).theme;
  const imageScale = useSharedValue(0.8);
  const textTranslateY = useSharedValue(50);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 5, stiffness: 40 });
    textTranslateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: withTiming(1, { duration: 1000 }),
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  return (
    <ScrollView style={{ backgroundColor: tema === 'dark' ? '#151718' : 'white' }}>
      <ThemedView style={{ flexDirection: isSmallScreen ? 'column' : 'row', padding: 20, alignItems: 'center' }}>
        <Animated.View style={[
          { 
            flex: 1,
            padding: 20,
            alignItems: 'center',
            borderRadius: 20,
            marginRight: isSmallScreen ? 0 : 20,
            marginBottom: isSmallScreen ? 20 : 0,
          },
          textStyle
        ]}>
          <Text style={{ fontSize: 12, marginBottom: 10, fontWeight: 'bold',backgroundColor:"black" ,color:"white", borderRadius:10,width:"50%"}}>WEB DEVELOPMENT / MARKETING</Text>
          <ThemedText style={{ fontSize: 24, marginBottom: 10, }}>I can help your business to</ThemedText>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#8A2BE2', marginBottom: 20 }}>Get online and grow fast</Text>
          <View style={{width:300, flexDirection: isSmallScreen ? 'column' : 'row', marginBottom: 20 }}>
            {['Resume', 'Projects'].map((text, index) => (
              <AnimatedTouchableOpacity 
                key={text}
                style={[
                  { 
                    backgroundColor: index === 0 ? '#8A2BE2' : 'transparent',
                    borderColor: '#8A2BE2',
                    borderWidth: index === 1 ? 2 : 0,
                    padding: 15, 
                    borderRadius: 5, 
                    marginRight: isSmallScreen ? 0 : (index === 0 ? 10 : 0),
                    marginBottom: isSmallScreen ? (index === 0 ? 10 : 0) : 0,
                    alignItems: 'center',
                  },
                  buttonAnimatedStyle
                ]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Text style={{ color: index === 0 ? 'white' : '#8A2BE2', fontWeight: 'bold' }}>{text}</Text>
              </AnimatedTouchableOpacity>
            ))}
          </View>
          <ThemedText style={{ fontSize: 16 }}>
            Let's work together to create amazing online experiences and drive your business growth!
          </ThemedText>
        </Animated.View>
        <Animated.View style={[
          {
            width: isSmallScreen ? '100%' : '50%',
            aspectRatio: 1,
            backgroundColor: '#FF69B4',
            borderRadius: 20,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          },
          imageStyle
        ]}>
          <Image
            source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xj6ElUOlQ7nbpNQOANVKwqXQjL338o.png' }}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
      </ThemedView>
      <ThemedView style={{ alignItems: 'center', marginTop: 20, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>About Me</Text>
        <ThemedText style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
          Mi Nombre Es Cristhian Un Apasionado De Los Sistemas
        </ThemedText>
        <ThemedText style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum neque quis congue placerat. 
          Proin ornare efficitur sem, ac elementum ipsum faucibus vel.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}