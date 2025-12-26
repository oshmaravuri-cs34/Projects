# Climate App

A React Native weather app with user authentication and city-based weather search.

## Features

- **User Login**: Simple authentication with username/password
- **Weather Search**: Search weather by city name
- **Current Location**: Automatic weather for current location
- **Weather Details**: Temperature, humidity, wind speed, and conditions
- **Responsive Design**: Works on both iOS and Android

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. For real weather data, get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

3. Replace `your_api_key_here` in `screens/WeatherScreen.js` with your actual API key

4. Start the app:
   ```bash
   npm start
   ```

## Usage

1. **Login**: Enter any username (3+ characters) and password (6+ characters)
2. **Search Weather**: Type a city name and tap "Search"
3. **Current Location**: Allow location permission for automatic weather
4. **Logout**: Tap the logout button to return to login screen

## Demo Mode

The app includes mock weather data for demonstration when no API key is configured.

## Login Credentials

For demo purposes, any username with 3+ characters and password with 6+ characters will work.
Example: username: `demo`, password: `123456`