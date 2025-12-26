import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { registerForPushNotifications, schedulePromotionNotification } from '../utils/notifications';
import * as Sharing from 'expo-sharing';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const { locale, changeLanguage, t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const handleLanguageChange = () => {
    Alert.alert(
      t('language'),
      'Select Language',
      [
        { text: 'English', onPress: () => changeLanguage('en') },
        { text: 'Español', onPress: () => changeLanguage('es') },
        { text: 'Français', onPress: () => changeLanguage('fr') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleNotificationToggle = async (value) => {
    setNotificationsEnabled(value);
    if (value) {
      await registerForPushNotifications();
      await schedulePromotionNotification(
        'Notifications Enabled',
        'You will now receive updates about your orders and special offers!'
      );
    }
  };

  const handleShareApp = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        Alert.alert('Share App', 'Share this amazing shopping app with friends!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const SettingItem = ({ icon, title, value, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}
      onPress={onPress}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={theme.primary} />
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={[styles.settingValue, { color: theme.textSecondary }]}>{value}</Text>}
        {rightComponent}
        {showArrow && !rightComponent && (
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t('settings')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>APPEARANCE</Text>
          <SettingItem
            icon="moon-outline"
            title={t('darkMode')}
            showArrow={false}
            rightComponent={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#ccc', true: theme.primary }}
                thumbColor="white"
              />
            }
          />
        </View>

        {/* Language & Region */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>LANGUAGE & REGION</Text>
          <SettingItem
            icon="language-outline"
            title={t('language')}
            value={locale.split('-')[0].toUpperCase()}
            onPress={handleLanguageChange}
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>NOTIFICATIONS</Text>
          <SettingItem
            icon="notifications-outline"
            title={t('notifications')}
            showArrow={false}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: '#ccc', true: theme.primary }}
                thumbColor="white"
              />
            }
          />
          <SettingItem
            icon="mail-outline"
            title="Email Notifications"
            onPress={() => {}}
          />
          <SettingItem
            icon="chatbubble-outline"
            title="SMS Notifications"
            onPress={() => {}}
          />
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PAYMENT</Text>
          <SettingItem
            icon="card-outline"
            title="Payment Methods"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
          <SettingItem
            icon="wallet-outline"
            title="Wallet"
            value="$0.00"
            onPress={() => {}}
          />
        </View>

        {/* Orders */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ORDERS</Text>
          <SettingItem
            icon="location-outline"
            title={t('trackOrder')}
            onPress={() => navigation.navigate('OrderTracking')}
          />
          <SettingItem
            icon="time-outline"
            title="Order History"
            onPress={() => {}}
          />
          <SettingItem
            icon="return-down-back-outline"
            title="Returns & Refunds"
            onPress={() => {}}
          />
        </View>

        {/* Advanced Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ADVANCED</Text>
          <SettingItem
            icon="cloud-offline-outline"
            title="Offline Mode"
            showArrow={false}
            rightComponent={
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                trackColor={{ false: '#ccc', true: theme.primary }}
                thumbColor="white"
              />
            }
          />
          <SettingItem
            icon="cube-outline"
            title="AR Features"
            value="Enabled"
            onPress={() => {}}
          />
          <SettingItem
            icon="share-social-outline"
            title={t('share')}
            onPress={handleShareApp}
          />
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SUPPORT</Text>
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => {}}
          />
          <SettingItem
            icon="chatbubbles-outline"
            title="Contact Support"
            onPress={() => {}}
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms & Conditions"
            onPress={() => {}}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => {}}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ABOUT</Text>
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            value="1.0.0"
            showArrow={false}
          />
          <SettingItem
            icon="star-outline"
            title="Rate Us"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 16,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    marginRight: 8,
  },
});

export default SettingsScreen;