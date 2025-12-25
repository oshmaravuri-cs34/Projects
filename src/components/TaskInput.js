import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedCategory, setSelectedCategory] = useState("Work");
  const [startTime, setStartTime] = useState("15:00");
  const [endTime, setEndTime] = useState("16:00");
  const [reminder, setReminder] = useState("15 minutes before");

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask({
        text: taskText.trim(),
        date: selectedDate,
        category: selectedCategory,
        startTime,
        endTime,
        reminder
      });
      setTaskText("");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TextInput
          placeholder="Add a new task..."
          style={styles.input}
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pills}>
        {["Today", "Tomorrow", "Custom"].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.pill,
              item === selectedDate && styles.activePill
            ]}
            onPress={() => setSelectedDate(item)}
          >
            <Text style={item === selectedDate ? styles.activeText : styles.pillText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.timeRow}>
        <TouchableOpacity onPress={() => {
          const times = ["09:00", "12:00", "15:00", "18:00"];
          const currentIndex = times.indexOf(startTime);
          const nextIndex = (currentIndex + 1) % times.length;
          setStartTime(times[nextIndex]);
        }}>
          <Text style={styles.label}>Start Time</Text>
          <Text style={styles.timeBox}>{startTime}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          const times = ["10:00", "13:00", "16:00", "19:00"];
          const currentIndex = times.indexOf(endTime);
          const nextIndex = (currentIndex + 1) % times.length;
          setEndTime(times[nextIndex]);
        }}>
          <Text style={styles.label}>End Time</Text>
          <Text style={styles.timeBox}>{endTime}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => {
          const reminders = ["15 minutes before", "30 minutes before", "1 hour before", "No reminder"];
          const currentIndex = reminders.indexOf(reminder);
          const nextIndex = (currentIndex + 1) % reminders.length;
          setReminder(reminders[nextIndex]);
        }}
      >
        <Text>⏰ {reminder}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => {
          const categories = ["Work", "Personal", "Health", "Finance"];
          const currentIndex = categories.indexOf(selectedCategory);
          const nextIndex = (currentIndex + 1) % categories.length;
          setSelectedCategory(categories[nextIndex]);
        }}
      >
        <Text>📁 {selectedCategory}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12
  },
  addBtn: {
    backgroundColor: "#6d5bd0",
    padding: 14,
    borderRadius: 14,
    marginLeft: 10
  },
  plusIcon: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },
  pills: {
    flexDirection: "row",
    marginVertical: 14
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 10
  },
  activePill: {
    backgroundColor: "#ede9fe",
    borderColor: "#c4b5fd"
  },
  pillText: {
    color: "#374151"
  },
  activeText: {
    color: "#7c3aed",
    fontWeight: "600"
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  label: {
    color: "#6b7280",
    fontSize: 12
  },
  timeBox: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 10,
    minWidth: 120,
    textAlign: "center"
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginTop: 10
  }
});
