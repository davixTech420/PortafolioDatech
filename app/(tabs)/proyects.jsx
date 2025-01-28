import React, { useContext, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform, Image, Modal,Linking } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import { Colors } from "@/constants/Colors"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { GradientText } from "@/components/GradientText"
import { ThemeContext } from "@/context/themeContext"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const ProjectCard = ({ title, description, imageSource, styleCard, styleCardContent, styleImage, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.card, styleCard]}>
    <View style={[styles.cardContent, styleCardContent]}>
      <ThemedText style={styles.projectTitle}>{title}</ThemedText>
      <ThemedText style={styles.projectDescription}>{description}</ThemedText>
    </View>
    <Image source={imageSource} style={[styles.projectImage, styleImage]} resizeMode="cover" />
  </TouchableOpacity>
)

const ProjectModal = ({ isVisible, onClose, title, description, imageSource,link }) => (
  <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
    <ThemedView style={styles.modalOverlay}>
      <ThemedView style={styles.modalContent}>
        <ThemedText style={styles.modalTitle}>{title}</ThemedText>
        <TouchableOpacity onPress={ () => {Linking.openURL(link)}} style={{ borderRadius: 10, padding: 10, backgroundColor: "#6dbcbc",width:"20%" }}>
          <ThemedText >Dirigir</ThemedText>
        </TouchableOpacity>
        <Image source={imageSource} style={styles.modalImage} resizeMode="contain" />
        <ScrollView style={styles.modalScrollView}>
          <ThemedText style={styles.modalDescription}>{description}</ThemedText>
        </ScrollView>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <ThemedText style={styles.closeButtonText}>Cerrar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  </Modal>
)

export default function ProjectShowcase() {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const buttonAnimation = useSharedValue(1)

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonAnimation.value }],
    }
  })

  const handlePress = () => {
    buttonAnimation.value = withSpring(0.9, {}, (finished) => {
      if (finished) {
        buttonAnimation.value = withSpring(1)
      }
    })
    router.navigate("/contact")
  }

  const tema = useContext(ThemeContext).theme

  const showProjectDetails = (project) => {
    setSelectedProject(project)
    setModalVisible(true)
  }

  const projects = [
    {
      title: "Datech LPC",
      description: "Sistema de informacion para la laogistica del alquiler de teatro y agendamientos de eventos.",
      imageSource: require("@/assets/images/lpc.png"),
      fullDescription:
        "Sistema de información para la logística del alquiler de teatro y agendamientos de eventos.\n\n" +
        "Características principales:\n" +
        "- Gestión de inventario de equipos de teatro\n" +
        "- Calendario de eventos y reservas\n" +
        "- Asignacion de empleados\n" +
        "- Reportes de utilización y disponibilidad\n\n" +
        "Tecnologías utilizadas: React, Node.js, MySql",
        link:"https://front-lpc.vercel.app/",
    },
    {
      title: "Datech Store",
      description: "frontend en react tienda de juegos",
      imageSource: require("@/assets/images/juegos.png"),
      fullDescription:
        "Frontend en React para una tienda de juegos online.\n\n" +
        "Características principales:\n" +
        "- Catálogo de juegos con filtros y búsqueda\n" +
        "- Sistema de carrito de compras\n" +
        "Tecnologías utilizadas: React",
        link:"https://storegamedatech.vercel.app/",
    },
    {
      title: "Comidas Datech",
      description: "frontend en react menu de comidas",
      imageSource: require("@/assets/images/comidas.png"),
      fullDescription:
        "Frontend en React para un menu online.\n\n" +
        "Características principales:\n" +
        "- Catálogo de menu\n" +
        "Tecnologías utilizadas: React, Tailwindcss, Vite",
        link:"https://comidas-rose.vercel.app/",
    },
    {
      title: "SOCOTEC",
      description: "Sistema de informacion para la administracion de socotec colombia",
      imageSource: require("@/assets/images/socotec.png"),
      fullDescription:
        "Sistema de información para la administración de socotec colombia.\n\n" +
        "Características principales:\n" +
        "- Gestión de inventario de equipos de socotec\n" +
        "- Calendario de eventos y reservas\n" +
        "- Asignacion de empleados a proyectos\n" +
        "- Crear y asignar grupos de trabajo a proyectos\n" +
        "- Reportes de utilización y disponibilidad\n" +
        "- Visualizacion de modelos 3D\n\n" +
        "Tecnologías utilizadas: React Native, Node.js, MySql",
        link:"https://socotec.vercel.app/",
    },
    {
      title: "Portafolio Administrable",
      description: "Portafolio personal en laravel administrable",
      imageSource: require("@/assets/images/portafolio.png"),
      fullDescription:
        "Sistema de información para la administración de mi portafolio.\n\n" +
        "Características principales:\n" +
        "- Gestión de skills\n" +
        "- Gestion de proyectos\n" +
        "- Gestion de educacion\n" +
        "- Mensajeria\n\n" +
        "Tecnologías utilizadas: Laravel,Mysql",
        link:"",
    },
    {
      title: "Tienda Virtual",
      description: "tienda virtual administrable",
      imageSource: require("@/assets/images/tiendaLara.png"),
      fullDescription:
        "Sistema de informacion para la administracion de mi tienda virtual.\n\n" +
        "Características principales:\n" +
        "- Gestión de usuarios\n" +
        "- Gestion de  inventario y filtrado por categorias\n" +
        "- Sistema de califacion,comentarios y lista de deseos\n" +
        "- Gestion de ventas y pedidos\n\n" +
        "Tecnologías utilizadas: Laravel,Mysql",
        link:"",
    },
  ]

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[tema].background }]}>
      <View style={styles.content}>
        <GradientText text="Proyectos" style={styles.title} />
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            styleCard={{ backgroundColor: Colors[tema].backgroundCard }}
            title={project.title}
            description={project.description}
            imageSource={project.imageSource}
            onPress={() => showProjectDetails(project)}
          />
        ))}
      </View>
      <LinearGradient colors={["#4200ff", "#a200ff", "#bd00ff"]} style={styles.footer}>
        <Text style={styles.footerText}>Demos Vida A Las Ideas</Text>
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Contactame</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
      {selectedProject && (
        <ProjectModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={selectedProject.title}
          description={selectedProject.fullDescription}
          imageSource={selectedProject.imageSource}
          link={selectedProject.link}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "web" ? 40 : 0,
  },
  content: {
    padding: 20,
    minHeight: SCREEN_HEIGHT - 200,
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
    overflow: "hidden",
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
  },
  projectImage: {
    width: 100,
    height: "100%",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    ...Platform.select({
      android: {
        marginBottom: 60,
      },
    }),
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
   
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  modalScrollView: {
    maxHeight: 200,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})

