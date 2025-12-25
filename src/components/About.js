import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  
  const highlights = [
    { icon: "trophy", text: "3+ Years Experience" },
    { icon: "code-slash", text: "15+ Projects Delivered" },
    { icon: "star", text: "5-Star Reviews" }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>About Me</Text>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        I'm a passionate mobile developer specializing in React Native and modern web technologies. 
        I love creating beautiful, user-friendly applications that solve real-world problems and 
        deliver exceptional user experiences.
      </Text>
      
      <View style={styles.highlightsContainer}>
        {highlights.map((highlight, index) => (
          <View key={index} style={[styles.highlight, { backgroundColor: theme.surface }]}>
            <Ionicons name={highlight.icon} size={24} color={theme.primary} />
            <Text style={[styles.highlightText, { color: theme.text }]}>{highlight.text}</Text>
          </View>
        ))}
      </View>
      
      <Text style={[styles.philosophy, { color: theme.textSecondary }]}>
        "Great design is not just what it looks like and feels like. Great design is how it works." 
        - Steve Jobs
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 24, marginBottom: 24 },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: '45%',
  },
  highlightText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  philosophy: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
});
