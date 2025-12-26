import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "../context/ThemeContext";

export default function Projects() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  const projectList = [
    { 
      name: "E-Commerce Mobile App", 
      desc: "Full-stack React Native app with payment integration",
      category: "Mobile Development",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
      description: "A comprehensive e-commerce solution built with React Native, featuring user authentication, product catalog, shopping cart, and secure payment processing. The app includes real-time inventory management and push notifications for order updates."
    },
    { 
      name: "Portfolio Website", 
      desc: "Responsive web portfolio with modern animations",
      category: "Web Development",
      technologies: ["React", "CSS3", "Framer Motion", "Netlify"],
      description: "A modern, responsive portfolio website showcasing projects and skills. Built with React and enhanced with smooth animations using Framer Motion. Features include dark/light theme toggle, contact form, and optimized performance."
    },
    { 
      name: "Task Management System", 
      desc: "Collaborative project management tool",
      category: "Full Stack",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      description: "A real-time collaborative task management system allowing teams to create, assign, and track project tasks. Features include real-time updates, file attachments, time tracking, and comprehensive reporting dashboard."
    },
  ];

  const handleProjectPress = (project) => {
    navigation.navigate('ProjectDetail', { project });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Featured Projects</Text>
      {projectList.map((project, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.projectCard, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
          onPress={() => handleProjectPress(project)}
          activeOpacity={0.7}
        >
          <View style={styles.projectHeader}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
              <Ionicons name="code-slash" size={24} color="white" />
            </View>
            <View style={styles.projectInfo}>
              <Text style={[styles.projectTitle, { color: theme.text }]}>{project.name}</Text>
              <Text style={[styles.projectCategory, { color: theme.primary }]}>{project.category}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </View>
          <Text style={[styles.projectDesc, { color: theme.textSecondary }]}>{project.desc}</Text>
          <View style={styles.techContainer}>
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <View key={techIndex} style={[styles.techBadge, { backgroundColor: theme.surface }]}>
                <Text style={[styles.techText, { color: theme.text }]}>{tech}</Text>
              </View>
            ))}
            {project.technologies.length > 3 && (
              <Text style={[styles.moreText, { color: theme.textSecondary }]}>+{project.technologies.length - 3} more</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  projectCard: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: { fontSize: 18, fontWeight: "600" },
  projectCategory: { fontSize: 14, fontWeight: "500", marginTop: 2 },
  projectDesc: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  techBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  techText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
