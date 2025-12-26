# Portfolio App Documentation

## Overview
A modern React Native portfolio application for Oshma Ravuri featuring dark/light theme support, interactive navigation, and professional presentation of skills, projects, and contact information.

## File Structure

```
PortfolioApp/
├── App.js                          # Main app entry point with navigation setup
├── package.json                    # Dependencies and project configuration
├── src/
│   ├── context/
│   │   └── ThemeContext.js         # Theme management (dark/light mode)
│   ├── screens/
│   │   ├── HomeScreen.js           # Main portfolio screen
│   │   └── ProjectDetailScreen.js  # Individual project details
│   └── components/
│       ├── Header.js               # Profile header with stats
│       ├── About.js                # About section with highlights
│       ├── Skills.js               # Categorized skills display
│       ├── Projects.js             # Interactive project cards
│       ├── Contact.js              # Contact methods with linking
│       └── WeatherCard.js          # (Legacy component)
└── assets/                         # App icons and images
```

## Architecture & Interlinking

### 1. Navigation Structure
```
App.js
├── ThemeProvider (Context Wrapper)
└── AppNavigator
    └── Tab Navigator (Bottom Tabs)
        ├── Portfolio Tab → ProjectStack
        ├── Projects Tab → ProjectStack  
        └── Contact Tab → ProjectStack
            └── Stack Navigator
                ├── HomeScreen (Default)
                └── ProjectDetailScreen
```

### 2. Component Hierarchy
```
HomeScreen
├── Header (Profile + Theme Toggle)
├── About (Experience highlights)
├── Skills (Categorized tech stack)
├── Projects (Interactive cards)
└── Contact (Linkable contact methods)
```

### 3. Data Flow
- **Theme Context**: Provides theme state to all components
- **Navigation Props**: Pass project data to detail screen
- **Component Props**: Theme and navigation objects passed down

## Key Approaches Used

### 1. **Context Pattern**
- `ThemeContext.js` manages global theme state
- Provides light/dark themes with consistent color schemes
- `useTheme()` hook for easy theme access in components

### 2. **Hybrid Navigation**
- **Bottom Tab Navigator**: Main app sections (Portfolio, Projects, Contact)
- **Stack Navigator**: Nested navigation for project details
- All tabs use same stack for consistent experience

### 3. **Component-Based Architecture**
- Modular components for reusability
- Each component handles its own styling and logic
- Theme-aware styling using context

### 4. **Interactive Design**
- TouchableOpacity for all interactive elements
- External linking for contact methods
- Navigation between screens for project details

### 5. **Modern UI Patterns**
- Card-based layouts with shadows
- Gradient backgrounds using LinearGradient
- Icon integration with Ionicons
- Responsive design principles

## Component Details

### Header.js
- **Purpose**: Profile introduction with theme toggle
- **Features**: Gradient background, stats display, theme switcher
- **Interlinking**: Uses ThemeContext for styling

### Projects.js
- **Purpose**: Display project portfolio
- **Features**: Interactive cards, tech stack badges
- **Interlinking**: Navigates to ProjectDetailScreen with project data

### ProjectDetailScreen.js
- **Purpose**: Detailed project information
- **Features**: Full descriptions, tech stack, back navigation
- **Interlinking**: Receives project data via route params

### Skills.js
- **Purpose**: Categorized skill presentation
- **Features**: Icon-based categories, skill badges
- **Interlinking**: Theme-aware styling

### Contact.js
- **Purpose**: Professional contact information
- **Features**: Direct linking (email, phone, social)
- **Interlinking**: External app integration via Linking API

### About.js
- **Purpose**: Professional summary and highlights
- **Features**: Experience metrics, inspirational quote
- **Interlinking**: Theme context integration

## Technical Stack

### Core Technologies
- **React Native**: Mobile app framework
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library

### UI Libraries
- **@expo/vector-icons**: Icon system
- **expo-linear-gradient**: Gradient backgrounds
- **react-native-reanimated**: Animation support

### Navigation Libraries
- **@react-navigation/native**: Core navigation
- **@react-navigation/bottom-tabs**: Tab navigation
- **@react-navigation/stack**: Stack navigation

## Key Features

### 1. **Theme System**
- Toggle between light and dark modes
- Consistent color schemes across all components
- Persistent theme state during app usage

### 2. **Professional Presentation**
- Clean, modern design language
- Interactive project showcase
- Direct contact integration

### 3. **Responsive Navigation**
- Bottom tab navigation for main sections
- Stack navigation for detailed views
- Smooth transitions between screens

### 4. **External Integration**
- Email client integration
- Phone dialer integration
- Social media profile linking

## Development Approach

### 1. **Modular Design**
- Separate components for different sections
- Reusable styling patterns
- Context-based state management

### 2. **User Experience Focus**
- Intuitive navigation patterns
- Visual feedback for interactions
- Professional content presentation

### 3. **Maintainable Code**
- Clear file organization
- Consistent naming conventions
- Documented component purposes

This architecture ensures scalability, maintainability, and a professional user experience while showcasing modern React Native development practices.