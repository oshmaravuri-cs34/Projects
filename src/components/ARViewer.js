import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ARViewer = ({ visible, onClose, product }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [hasPermission, setHasPermission] = useState(null);
  const [isARActive, setIsARActive] = useState(false);
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleAR = () => {
    setIsARActive(!isARActive);
  };

  const takeSnapshot = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        Alert.alert('Success', 'AR snapshot saved!');
      } catch (error) {
        Alert.alert('Error', 'Failed to take snapshot');
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <Modal visible={visible} animationType="slide">
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.text }]}>{t('arView')}</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.permissionContainer}>
            <Ionicons name="camera-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.permissionText, { color: theme.text }]}>
              Camera permission required for AR view
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{product?.name} - {t('arView')}</Text>
          <View style={{ width: 24 }} />
        </View>

        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        >
          {/* AR Overlay */}
          <View style={styles.arOverlay}>
            {isARActive && (
              <View style={styles.arObject}>
                <Text style={styles.arText}>3D {product?.name}</Text>
                <View style={styles.arPlaceholder} />
              </View>
            )}
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleAR}>
              <Ionicons 
                name={isARActive ? "cube" : "cube-outline"} 
                size={24} 
                color="white" 
              />
              <Text style={styles.controlText}>
                {isARActive ? 'Hide AR' : 'Show AR'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={takeSnapshot}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.controlText}>Snapshot</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  arOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arObject: {
    alignItems: 'center',
  },
  arText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  arPlaceholder: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  controlButton: {
    alignItems: 'center',
    padding: 10,
  },
  controlText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ARViewer;