# Counter App Documentation

## File Structure

```
FirstApp/
├── App.js                 # Main application component
├── package.json          # Dependencies and project config
├── index.js             # Entry point (Expo/React Native)
├── app.json             # Expo configuration
└── assets/              # Static resources (icons, images)
```

## Architecture Approach

### Single Component Design
- **Monolithic Structure**: All functionality contained in one component for simplicity
- **Functional Component**: Uses React hooks instead of class components
- **State Management**: Local state with useState hook

### Core Logic
```javascript
const [count, setCount] = useState(0);  // State initialization
```

## Component Interlinking

### State Flow
```
useState(0) → count → Text Display
     ↑                    ↓
State Updates ← Button Interactions
```

### Event Handlers
- **Increment**: `() => setCount(count + 1)`
- **Decrement**: `() => setCount(count - 1)`  
- **Reset**: `() => setCount(0)`

### UI Hierarchy
```
App (Root)
├── View (container)
│   ├── Text (counter display)
│   └── View (buttonContainer)
│       ├── TouchableOpacity (decrement)
│       ├── TouchableOpacity (reset)
│       └── TouchableOpacity (increment)
```

## Data Flow

1. **Initial State**: Counter starts at 0
2. **User Interaction**: Button press triggers onPress handler
3. **State Update**: setCount updates the count value
4. **Re-render**: Component re-renders with new count
5. **Display Update**: Text component shows updated value

## Styling Strategy

- **StyleSheet**: Centralized styling using React Native's StyleSheet
- **Flexbox Layout**: Uses flex properties for responsive design
- **Component Isolation**: Each UI element has dedicated styles

## Dependencies

- **React**: Core library for component logic
- **React Native**: Platform-specific UI components
- **Expo**: Development and build toolchain (implicit)

## Execution Flow

```
index.js → App.js → Component Mount → useState → Render → User Interaction → State Update → Re-render
```