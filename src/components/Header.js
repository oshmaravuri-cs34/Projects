import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.header}
    >
      <TouchableOpacity 
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <Ionicons 
          name={isDark ? 'sunny' : 'moon'} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
      
      <View style={[styles.image, styles.placeholder]}>
        <Ionicons name="person" size={40} color="white" />
      </View>
      <Text style={styles.title}>Oshma Ravuri</Text>
      <Text style={styles.subtitle}>Mobile Developer | UI/UX Enthusiast</Text>
      
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>15+</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>3+</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 40,
    paddingTop: 60,
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});
