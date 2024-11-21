import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  Linking
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { GradientText } from "@/components/GradientText";
import { GradientButton } from "@/components/GradientButton";
import  GradientIcon  from "@/components/GradientIcon";
import { ThemeContext } from "@/context/themeContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Component() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;
  const tema = useContext(ThemeContext).theme;
  const imageScale = useSharedValue(0.8);
  const textTranslateY = useSharedValue(50);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 5, stiffness: 40 });
    textTranslateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
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
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  return (
    <>
     <AnimatedScrollView
      style={{ backgroundColor: tema === "dark" ? "#151718" : "white" }}
      onScroll={(event) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 0) {
          textTranslateY.value = withTiming(50, { duration: 1000 });
        } else {
          textTranslateY.value = withTiming(0, { duration: 1000 });
        }
      }}
    > 
      <ThemedView
        style={{
          flexDirection: isSmallScreen ? "column" : "row",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              padding: 20,
              alignItems: "center",
              borderRadius: 20,
              bottom:-30,
              marginBottom: 20,
              /* marginRight: isSmallScreen ? 0 : 20,
              marginBottom: isSmallScreen ? 20 : 0, */
            },
            textStyle,
          ]}
        >
          <LinearGradient
            colors={["#4200ff", "#a200ff", "#bd00ff"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{ borderRadius: 50, padding: 5, marginBottom: 10 }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "white" }}>
              DESARROLLADOR / WEB , MOBILES
            </Text>
          </LinearGradient>
          <ThemedText style={{ fontSize: 24, marginBottom: 10 }}>
          Puedo ayudar a tu negocio a
          </ThemedText>
          <GradientText
            text="Superar Los Limites"
            style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}
          />
          <View
            style={{
              width: 300,
              flexDirection: isSmallScreen ? "column" : "row",
              marginBottom: 20,
              justifyContent: "space-around",
            }}
          >

            <GradientButton text="Resumen" textStyle={{ fontSize: 14, color: 'white', fontWeight: 'bold' }} buttonStyle={{ padding: 15, borderRadius: 50 }}   onPress={() => { router.navigate("/resumen") }} />

            <AnimatedTouchableOpacity
                  style={[
                    {
                      marginTop: isSmallScreen ? 20 : 0,
                      backgroundColor:"transparent" ,
                      borderColor: "#8A2BE2",
                      borderWidth:  2,
                      padding: 15,
                      borderRadius: 50,
                      alignItems: "center",
                    },
                    buttonAnimatedStyle,
                  ]}
                  onPress={() => { router.navigate("/proyects") }}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Text
                    style={{
                      color:  "#8A2BE2",
                      fontWeight: "bold",
                    }}
                  >
                    Proyectos
                  </Text>
                </AnimatedTouchableOpacity>
          </View>
          
        </Animated.View>
      {Platform.OS == "web" && (
        <>
        <LinearGradient
         colors={["#4200ff", "#a200ff", "#bd00ff"]}
         start={[0, 0]}
         end={[1, 1]}
         style={{
          marginTop: 60,
          borderRadius: 20,
          right:isSmallScreen ? 0 : 45,
         }}
         >
        <img src={"../../assets/images/yo.png"}  width={isSmallScreen ? 300 : 400} style={{ borderRadius: 20 }}  />
        </LinearGradient>

       
        </>

      )}
      {Platform.OS !== "web" && (
         <LinearGradient
         colors={["#4200ff", "#a200ff", "#bd00ff"]}
         start={[0, 0]}
         end={[1, 1]}
         style={{
           flex: 1,
           borderRadius: 20,
           shadowColor: "black",
           shadowOffset: { width: 0, height: 0 },
           shadowOpacity: 0.9,
           shadowRadius: 10,
            marginTop: 25,
         }}
       >
         <Animated.View
           style={[
             {
               width: "100%",
               height: "100%",
               aspectRatio: 1,
               justifyContent: "center",
               alignItems: "center",
             },
            imageStyle
           ]}
         >
           <Image
             source={require("../../assets/images/yo.png")}
             style={{
               borderRadius: 20,
               width: "100%",
               height: "100%",
              
               bottom: 0,
             }}
           />
         </Animated.View>
       </LinearGradient>
      )}
       
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginTop: 20, padding: 20 }}>
        <GradientText
          style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}
          text="Sobre Mi"
        />
        <ThemedText
          style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
        >
          Mi Nombre Es Cristhian Un Apasionado De Los Sistemas
        </ThemedText>
        <ThemedText
          style={{ textAlign: "center", marginBottom: 20, color: "#666" }}
        >
         Soy un desarrollador de software enfocado en crear aplicaciones eficientes y escalables. Me encanta resolver problemas y aprender nuevas tecnologías. Si buscas innovación y calidad, ¡hablemos!
        </ThemedText>
      </ThemedView>
      <View style={{   flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: isSmallScreen ? 80 : 25 }}>
      
      <TouchableOpacity
      onPress={() => { Linking.openURL("https://github.com/davixTech420") }}>
        <GradientIcon name="logo-github"  />
        </TouchableOpacity>
        <TouchableOpacity
      onPress={() => { Linking.openURL("https://www.linkedin.com/in/cristhian-amaya-338b05271") }}>
                <GradientIcon name="logo-linkedin" />
        </TouchableOpacity>
        <TouchableOpacity
      onPress={() => { Linking.openURL("https://www.facebook.com/profile.php?id=100015933678587") }}>
        <GradientIcon name="logo-facebook" />
        </TouchableOpacity>
        <TouchableOpacity
      onPress={() => { Linking.openURL("https://www.youtube.com/@Datech-420") }}>
        <GradientIcon name="logo-youtube" />
        </TouchableOpacity>
        
        

      </View>

      </AnimatedScrollView>  
    </>
  );
}

