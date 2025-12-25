import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    home: 'Home',
    search: 'Search',
    cart: 'Cart',
    profile: 'Profile',
    hello: 'Hello',
    whatLooking: 'What are you looking for?',
    categories: 'Categories',
    featured: 'Featured Products',
    recommended: 'Recommended for You',
    seeAll: 'See All',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    reviews: 'Reviews',
    description: 'Description',
    shipping: 'Shipping',
    wishlist: 'Wishlist',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    orders: 'Orders',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    notifications: 'Notifications',
    emptyCart: 'Your cart is empty',
    emptyWishlist: 'Your wishlist is empty',
    total: 'Total',
    checkout: 'Checkout',
    payNow: 'Pay Now',
    orderPlaced: 'Order placed successfully!',
    trackOrder: 'Track Order',
    share: 'Share',
    camera: 'Camera',
    arView: 'AR View',
  },
  es: {
    home: 'Inicio',
    search: 'Buscar',
    cart: 'Carrito',
    profile: 'Perfil',
    hello: 'Hola',
    whatLooking: '¿Qué estás buscando?',
    categories: 'Categorías',
    featured: 'Productos Destacados',
    recommended: 'Recomendado para Ti',
    seeAll: 'Ver Todo',
    addToCart: 'Añadir al Carrito',
    buyNow: 'Comprar Ahora',
    reviews: 'Reseñas',
    description: 'Descripción',
    shipping: 'Envío',
    wishlist: 'Lista de Deseos',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    logout: 'Cerrar Sesión',
    orders: 'Pedidos',
    settings: 'Configuración',
    darkMode: 'Modo Oscuro',
    language: 'Idioma',
    notifications: 'Notificaciones',
    emptyCart: 'Tu carrito está vacío',
    emptyWishlist: 'Tu lista de deseos está vacía',
    total: 'Total',
    checkout: 'Finalizar Compra',
    payNow: 'Pagar Ahora',
    orderPlaced: '¡Pedido realizado con éxito!',
    trackOrder: 'Rastrear Pedido',
    share: 'Compartir',
    camera: 'Cámara',
    arView: 'Vista AR',
  },
  fr: {
    home: 'Accueil',
    search: 'Rechercher',
    cart: 'Panier',
    profile: 'Profil',
    hello: 'Bonjour',
    whatLooking: 'Que cherchez-vous?',
    categories: 'Catégories',
    featured: 'Produits en Vedette',
    recommended: 'Recommandé pour Vous',
    seeAll: 'Voir Tout',
    addToCart: 'Ajouter au Panier',
    buyNow: 'Acheter Maintenant',
    reviews: 'Avis',
    description: 'Description',
    shipping: 'Livraison',
    wishlist: 'Liste de Souhaits',
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    orders: 'Commandes',
    settings: 'Paramètres',
    darkMode: 'Mode Sombre',
    language: 'Langue',
    notifications: 'Notifications',
    emptyCart: 'Votre panier est vide',
    emptyWishlist: 'Votre liste de souhaits est vide',
    total: 'Total',
    checkout: 'Commander',
    payNow: 'Payer Maintenant',
    orderPlaced: 'Commande passée avec succès!',
    trackOrder: 'Suivre la Commande',
    share: 'Partager',
    camera: 'Caméra',
    arView: 'Vue AR',
  },
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLocale(savedLanguage);
        i18n.locale = savedLanguage;
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (newLocale) => {
    setLocale(newLocale);
    i18n.locale = newLocale;
    await AsyncStorage.setItem('language', newLocale);
  };

  const t = (key) => i18n.t(key);

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);