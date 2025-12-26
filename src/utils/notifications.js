import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerForPushNotifications = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem('pushToken', token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF6B35',
      });
    }

    return token;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    return null;
  }
};

export const scheduleOrderNotification = async (orderId, estimatedDelivery) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Order Confirmed! 🎉',
      body: `Your order #${orderId} has been confirmed. Estimated delivery: ${estimatedDelivery}`,
      data: { orderId, type: 'order_confirmed' },
    },
    trigger: { seconds: 2 },
  });
};

export const scheduleDeliveryNotification = async (orderId) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Out for Delivery 🚚',
      body: `Your order #${orderId} is out for delivery!`,
      data: { orderId, type: 'out_for_delivery' },
    },
    trigger: { seconds: 5 },
  });
};

export const schedulePromotionNotification = async (title, message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: message,
      data: { type: 'promotion' },
    },
    trigger: { seconds: 1 },
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};