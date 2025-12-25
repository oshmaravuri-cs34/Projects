import { Alert } from 'react-native';

// Mock payment service - replace with actual Stripe integration
export const processPayment = async (amount, paymentMethod = 'card') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment processing
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        resolve({
          success: true,
          transactionId: `txn_${Date.now()}`,
          amount,
          paymentMethod,
          timestamp: new Date().toISOString(),
        });
      } else {
        reject(new Error('Payment failed. Please try again.'));
      }
    }, 2000);
  });
};

export const initializePayment = async (orderDetails) => {
  try {
    Alert.alert(
      'Payment Method',
      'Choose your payment method:',
      [
        { text: 'Credit Card', onPress: () => processCardPayment(orderDetails) },
        { text: 'PayPal', onPress: () => processPayPalPayment(orderDetails) },
        { text: 'Apple Pay', onPress: () => processApplePayment(orderDetails) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
};

const processCardPayment = async (orderDetails) => {
  try {
    const result = await processPayment(orderDetails.total, 'card');
    return result;
  } catch (error) {
    Alert.alert('Payment Failed', error.message);
    throw error;
  }
};

const processPayPalPayment = async (orderDetails) => {
  try {
    const result = await processPayment(orderDetails.total, 'paypal');
    return result;
  } catch (error) {
    Alert.alert('Payment Failed', error.message);
    throw error;
  }
};

const processApplePayment = async (orderDetails) => {
  try {
    const result = await processPayment(orderDetails.total, 'apple_pay');
    return result;
  } catch (error) {
    Alert.alert('Payment Failed', error.message);
    throw error;
  }
};

export const validatePaymentData = (paymentData) => {
  const { cardNumber, expiryDate, cvv, holderName } = paymentData;
  
  if (!cardNumber || cardNumber.length < 16) {
    return { valid: false, error: 'Invalid card number' };
  }
  
  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return { valid: false, error: 'Invalid expiry date (MM/YY)' };
  }
  
  if (!cvv || cvv.length < 3) {
    return { valid: false, error: 'Invalid CVV' };
  }
  
  if (!holderName || holderName.trim().length < 2) {
    return { valid: false, error: 'Invalid cardholder name' };
  }
  
  return { valid: true };
};