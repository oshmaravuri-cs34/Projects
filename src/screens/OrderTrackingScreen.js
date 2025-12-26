import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LottieView from 'lottie-react-native';

const OrderTrackingScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock order data
    setOrders([
      {
        id: 'ORD001',
        status: 'delivered',
        items: ['iPhone 15 Pro', 'AirPods Pro'],
        total: 1299,
        orderDate: '2024-01-15',
        deliveryDate: '2024-01-18',
        trackingSteps: [
          { status: 'ordered', completed: true, date: '2024-01-15 10:30' },
          { status: 'confirmed', completed: true, date: '2024-01-15 11:00' },
          { status: 'shipped', completed: true, date: '2024-01-16 09:00' },
          { status: 'out_for_delivery', completed: true, date: '2024-01-18 08:00' },
          { status: 'delivered', completed: true, date: '2024-01-18 14:30' },
        ],
      },
      {
        id: 'ORD002',
        status: 'shipped',
        items: ['MacBook Pro 14"'],
        total: 1999,
        orderDate: '2024-01-20',
        estimatedDelivery: '2024-01-23',
        trackingSteps: [
          { status: 'ordered', completed: true, date: '2024-01-20 15:20' },
          { status: 'confirmed', completed: true, date: '2024-01-20 16:00' },
          { status: 'shipped', completed: true, date: '2024-01-21 10:00' },
          { status: 'out_for_delivery', completed: false },
          { status: 'delivered', completed: false },
        ],
      },
    ]);
  }, []);

  const getStatusIcon = (status, completed) => {
    const iconMap = {
      ordered: 'receipt-outline',
      confirmed: 'checkmark-circle-outline',
      shipped: 'airplane-outline',
      out_for_delivery: 'car-outline',
      delivered: 'home-outline',
    };

    return (
      <Ionicons
        name={iconMap[status]}
        size={24}
        color={completed ? theme.primary : theme.textSecondary}
      />
    );
  };

  const getStatusText = (status) => {
    const statusMap = {
      ordered: 'Order Placed',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
    };
    return statusMap[status];
  };

  const OrderCard = ({ order }) => (
    <View style={[styles.orderCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.orderHeader}>
        <Text style={[styles.orderId, { color: theme.text }]}>#{order.id}</Text>
        <Text style={[styles.orderTotal, { color: theme.primary }]}>${order.total}</Text>
      </View>
      
      <Text style={[styles.orderItems, { color: theme.textSecondary }]}>
        {order.items.join(', ')}
      </Text>
      
      <View style={styles.trackingContainer}>
        {order.trackingSteps.map((step, index) => (
          <View key={step.status} style={styles.trackingStep}>
            <View style={styles.stepIcon}>
              {getStatusIcon(step.status, step.completed)}
              {index < order.trackingSteps.length - 1 && (
                <View style={[
                  styles.stepLine,
                  { backgroundColor: step.completed ? theme.primary : theme.border }
                ]} />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text style={[
                styles.stepTitle,
                { color: step.completed ? theme.text : theme.textSecondary }
              ]}>
                {getStatusText(step.status)}
              </Text>
              {step.date && (
                <Text style={[styles.stepDate, { color: theme.textSecondary }]}>
                  {step.date}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {order.status === 'shipped' && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../../assets/truck-animation.json')}
            autoPlay
            loop
            style={styles.truckAnimation}
          />
          <Text style={[styles.estimatedText, { color: theme.textSecondary }]}>
            Estimated delivery: {order.estimatedDelivery}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t('trackOrder')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  orderCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    marginBottom: 16,
  },
  trackingContainer: {
    marginVertical: 16,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepIcon: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepLine: {
    width: 2,
    height: 30,
    marginTop: 8,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDate: {
    fontSize: 12,
  },
  animationContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  truckAnimation: {
    width: 100,
    height: 60,
  },
  estimatedText: {
    fontSize: 12,
    marginTop: 8,
  },
});

export default OrderTrackingScreen;