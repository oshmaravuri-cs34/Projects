import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../context/ThemeContext";

export default function Skills() {
  const { theme } = useTheme();
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: "phone-portrait",
      skills: ["React Native", "React", "JavaScript", "TypeScript", "CSS3"]
    },
    {
      title: "Backend",
      icon: "server",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Tools",
      icon: "construct",
      skills: ["Git", "Expo", "Firebase", "AWS", "Docker"]
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Skills & Expertise</Text>
      {skillCategories.map((category, index) => (
        <View key={index} style={[styles.categoryCard, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
          <View style={styles.categoryHeader}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
              <Ionicons name={category.icon} size={20} color="white" />
            </View>
            <Text style={[styles.categoryTitle, { color: theme.text }]}>{category.title}</Text>
          </View>
          <View style={styles.skillsGrid}>
            {category.skills.map((skill, skillIndex) => (
              <View key={skillIndex} style={[styles.skillBadge, { backgroundColor: theme.surface }]}>
                <Text style={[styles.skillText, { color: theme.text }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  categoryCard: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
