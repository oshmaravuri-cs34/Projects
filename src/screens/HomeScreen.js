import React from "react";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function HomeScreen() {
  const { theme } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
