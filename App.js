import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import HomeScreen from "./src/screens/HomeScreen";
import ProjectDetailScreen from "./src/screens/ProjectDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProjectStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { theme, isDark } = useTheme();
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Portfolio') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'Projects') iconName = focused ? 'briefcase' : 'briefcase-outline';
            else if (route.name === 'Contact') iconName = focused ? 'mail' : 'mail-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Portfolio" component={ProjectStack} />
        <Tab.Screen name="Projects" component={ProjectStack} />
        <Tab.Screen name="Contact" component={ProjectStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}