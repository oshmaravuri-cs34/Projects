<<<<<<< HEAD
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import TaskInput from "../components/TaskInput";
import CategoryFilter from "../components/CategoryFilter";
import TaskEmpty from "../components/TaskEmpty";
import TaskList from "../components/TaskList";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = selectedCategory === "All" 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>My To-Do List</Text>
        <Text style={styles.subtitle}>Stay organized & productive</Text>
      </View>

      <TaskInput onAddTask={addTask} />

      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredTasks.length > 0 ? (
        <TaskList 
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      ) : (
        <TaskEmpty />
      )}
    </ScrollView>
=======
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
>>>>>>> 498be2f13e26987a159f6cea3e0bf755399c719a
  );
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    backgroundColor: "#6d5bd0",
    flex: 1,
    padding: 16
  },
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827"
  },
  subtitle: {
    marginTop: 6,
    color: "#6b7280"
  }
=======
    flex: 1,
  },
>>>>>>> 498be2f13e26987a159f6cea3e0bf755399c719a
});
