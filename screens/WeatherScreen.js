import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function WeatherScreen({ onLogout }) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
    getCurrentLocationWeather();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const getCurrentLocationWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      // Using OpenWeatherMap API (free tier)
      const API_KEY = 'your_api_key_here'; // Replace with actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        // Fallback to mock data for demo
        setWeather(getMockWeatherData('Current Location'));
      }
    } catch (error) {
      setWeather(getMockWeatherData('Current Location'));
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      // Using OpenWeatherMap API
      const API_KEY = 'your_api_key_here'; // Replace with actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        // Fallback to mock data for demo
        setWeather(getMockWeatherData(city));
      }
    } catch (error) {
      setWeather(getMockWeatherData(city));
    } finally {
      setLoading(false);
    }
  };

  const getMockWeatherData = (cityName) => ({
    name: cityName,
    main: {
      temp: Math.floor(Math.random() * 30) + 10,
      feels_like: Math.floor(Math.random() * 30) + 10,
      humidity: Math.floor(Math.random() * 50) + 30,
    },
    weather: [{
      main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
      description: 'Mock weather data',
    }],
    wind: {
      speed: Math.floor(Math.random() * 10) + 1,
    },
  });

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      onLogout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear': return '☀️';
      case 'Clouds': return '☁️';
      case 'Rain': return '🌧️';
      case 'Snow': return '❄️';
      default: return '🌤️';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, {user?.username || 'User'}!
        </Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={searchWeather}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchWeather}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      )}

      {weather && !loading && (
        <View style={styles.weatherCard}>
          <Text style={styles.cityName}>{weather.name}</Text>
          <View style={styles.weatherMain}>
            <Text style={styles.weatherIcon}>
              {getWeatherIcon(weather.weather[0].main)}
            </Text>
            <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          </View>
          <Text style={styles.weatherDescription}>
            {weather.weather[0].main} - {weather.weather[0].description}
          </Text>
          
          <View style={styles.weatherDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Feels like</Text>
              <Text style={styles.detailValue}>{Math.round(weather.main.feels_like)}°C</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wind Speed</Text>
              <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#4A90E2',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#2E5BBA',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  weatherCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherIcon: {
    fontSize: 60,
    marginRight: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  weatherDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});