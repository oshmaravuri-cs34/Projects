import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <View>
      {tasks.map(task => (
        <View key={task.id} style={styles.taskCard}>
          <TouchableOpacity 
            style={styles.taskContent}
            onPress={() => onToggleTask(task.id)}
          >
            <View style={styles.taskHeader}>
              <View style={[
                styles.checkbox,
                task.completed && styles.checkedBox
              ]}>
                {task.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[
                styles.taskText,
                task.completed && styles.completedText
              ]}>
                {task.text}
              </Text>
            </View>
            
            <View style={styles.taskDetails}>
              <Text style={styles.detailText}>📅 {task.date}</Text>
              <Text style={styles.detailText}>🕐 {task.startTime} - {task.endTime}</Text>
              <Text style={styles.detailText}>📁 {task.category}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteBtn}
            onPress={() => onDeleteTask(task.id)}
          >
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  taskContent: {
    flex: 1
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  checkedBox: {
    backgroundColor: "#6d5bd0",
    borderColor: "#6d5bd0"
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  taskText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9ca3af"
  },
  taskDetails: {
    marginLeft: 36
  },
  detailText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2
  },
  deleteBtn: {
    padding: 8
  },
  deleteText: {
    fontSize: 18
  }
});