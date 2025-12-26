import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-netinfo/netinfo';

class OfflineStorage {
  constructor() {
    this.isOnline = true;
    this.pendingActions = [];
    this.init();
  }

  async init() {
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected;
      if (this.isOnline) {
        this.syncPendingActions();
      }
    });
    
    await this.loadPendingActions();
  }

  async saveOfflineData(key, data) {
    try {
      await AsyncStorage.setItem(`offline_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  }

  async getOfflineData(key) {
    try {
      const data = await AsyncStorage.getItem(`offline_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting offline data:', error);
      return null;
    }
  }

  async addPendingAction(action) {
    this.pendingActions.push({
      ...action,
      timestamp: Date.now(),
      id: `action_${Date.now()}_${Math.random()}`,
    });
    await this.savePendingActions();
  }

  async savePendingActions() {
    try {
      await AsyncStorage.setItem('pendingActions', JSON.stringify(this.pendingActions));
    } catch (error) {
      console.error('Error saving pending actions:', error);
    }
  }

  async loadPendingActions() {
    try {
      const actions = await AsyncStorage.getItem('pendingActions');
      this.pendingActions = actions ? JSON.parse(actions) : [];
    } catch (error) {
      console.error('Error loading pending actions:', error);
    }
  }

  async syncPendingActions() {
    if (!this.isOnline || this.pendingActions.length === 0) return;

    const actionsToSync = [...this.pendingActions];
    this.pendingActions = [];
    await this.savePendingActions();

    for (const action of actionsToSync) {
      try {
        await this.executeAction(action);
      } catch (error) {
        console.error('Error syncing action:', error);
        this.pendingActions.push(action);
      }
    }

    if (this.pendingActions.length > 0) {
      await this.savePendingActions();
    }
  }

  async executeAction(action) {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Sync cart addition to server
        break;
      case 'ADD_TO_WISHLIST':
        // Sync wishlist addition to server
        break;
      case 'PLACE_ORDER':
        // Sync order placement to server
        break;
      default:
        console.log('Unknown action type:', action.type);
    }
  }

  async cacheProducts(products) {
    await this.saveOfflineData('products', products);
  }

  async getCachedProducts() {
    return await this.getOfflineData('products');
  }

  async cacheCategories(categories) {
    await this.saveOfflineData('categories', categories);
  }

  async getCachedCategories() {
    return await this.getOfflineData('categories');
  }

  isOffline() {
    return !this.isOnline;
  }
}

export default new OfflineStorage();