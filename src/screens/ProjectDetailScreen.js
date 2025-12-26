import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export default function ProjectDetailScreen({ route, navigation }) {
  const { project } = route.params;
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.header}
      >
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.subtitle}>{project.category}</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        <Text style={[styles.description, { color: theme.text }]}>
          {project.description}
        </Text>
        
        <View style={styles.techStack}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tech Stack</Text>
          <View style={styles.techList}>
            {project.technologies.map((tech, index) => (
              <View key={index} style={[styles.techItem, { backgroundColor: theme.surface }]}>
                <Text style={[styles.techText, { color: theme.text }]}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Projects</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 40, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
  content: { padding: 24 },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  techList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techItem: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  techText: { fontSize: 14, fontWeight: '500' },
  button: { marginTop: 32, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});