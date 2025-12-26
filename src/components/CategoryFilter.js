import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { CATEGORIES } from "../constants/categories";

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {CATEGORIES.map(cat => (
        <TouchableOpacity
          key={cat.name}
          style={[
            styles.badge, 
            { backgroundColor: cat.bg },
            selectedCategory === cat.name && styles.selectedBadge
          ]}
          onPress={() => onSelectCategory(cat.name)}
        >
          <Text style={{ 
            color: cat.text, 
            fontWeight: selectedCategory === cat.name ? "700" : "600" 
          }}>
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 16
  }
});
