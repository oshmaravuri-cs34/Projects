import { View, Text, StyleSheet } from "react-native";

export default function TaskEmpty() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No tasks yet. Add one to get started! 🎯
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center"
  },
  text: {
    color: "#9ca3af"
  }
});
