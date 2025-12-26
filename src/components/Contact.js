import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  
  const contactMethods = [
    {
      icon: "mail",
      label: "Email",
      value: "oshma.ravuri@gmail.com",
      action: () => Linking.openURL("mailto:oshma.ravuri@gmail.com")
    },
    {
      icon: "call",
      label: "Phone",
      value: "+91 9876543210",
      action: () => Linking.openURL("tel:+919876543210")
    },
    {
      icon: "logo-linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/oshmaravuri",
      action: () => Linking.openURL("https://linkedin.com/in/oshmaravuri")
    },
    {
      icon: "logo-github",
      label: "GitHub",
      value: "github.com/oshmaravuri",
      action: () => Linking.openURL("https://github.com/oshmaravuri")
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Let's Connect</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Ready to bring your ideas to life? Let's discuss your next project!
      </Text>
      
      <View style={styles.contactGrid}>
        {contactMethods.map((method, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.contactCard, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
            onPress={method.action}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
              <Ionicons name={method.icon} size={24} color="white" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: theme.textSecondary }]}>{method.label}</Text>
              <Text style={[styles.contactValue, { color: theme.text }]} numberOfLines={1}>
                {method.value}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Available for freelance projects and full-time opportunities
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, marginBottom: 48 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22, marginBottom: 24 },
  contactGrid: { gap: 12, marginBottom: 24 },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  footer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
