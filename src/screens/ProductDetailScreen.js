import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const { addToCart, addToWishlist, wishlist } = useCart();
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert('Success', 'Product added to cart!');
  };

  const handleBuyNow = () => {
    Alert.alert('Buy Now', `Total: $${product.price * quantity}\n\nProceed to checkout?`);
  };

  const handleShare = () => {
    Alert.alert('Share', `Share ${product.name} with friends!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />);
    }
    return stars;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToWishlist(product)} style={styles.headerButton}>
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={isInWishlist ? theme.primary : theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.discount > 0 && (
            <View style={[styles.discountBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
          <TouchableOpacity 
            style={[styles.arButton, { backgroundColor: theme.primary }]}
            onPress={() => Alert.alert('AR View', 'AR feature coming soon!')}
          >
            <Ionicons name="cube-outline" size={20} color="white" />
            <Text style={styles.arButtonText}>AR View</Text>
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={[styles.productInfo, { backgroundColor: theme.surface }]}>
          <Text style={[styles.productName, { color: theme.text }]}>{product.name}</Text>
          <Text style={[styles.category, { color: theme.textSecondary }]}>{product.category}</Text>
          
          <TouchableOpacity 
            style={styles.ratingContainer}
            onPress={() => Alert.alert('Reviews', 'Reviews feature coming soon!')}
          >
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={[styles.rating, { color: theme.text }]}>{product.rating}</Text>
            <Text style={[styles.reviews, { color: theme.textSecondary }]}>({product.reviews} reviews)</Text>
          </TouchableOpacity>

          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.primary }]}>${product.price}</Text>
            {product.originalPrice > product.price && (
              <Text style={[styles.originalPrice, { color: theme.textSecondary }]}>${product.originalPrice}</Text>
            )}
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityLabel, { color: theme.text }]}>Quantity:</Text>
            <View style={[styles.quantitySelector, { borderColor: theme.border }]}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
              <Text style={[styles.quantityText, { color: theme.text }]}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={[styles.description, { color: theme.text }]}>{product.description}</Text>
            <View style={styles.featuresContainer}>
              <Text style={[styles.featuresTitle, { color: theme.text }]}>Key Features:</Text>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#06FFA5" />
                  <Text style={[styles.featureText, { color: theme.text }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={[styles.relatedTitle, { color: theme.text }]}>Related Products</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.relatedProducts}>
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard
                      key={relatedProduct.id}
                      product={relatedProduct}
                      style={styles.relatedProductCard}
                      onPress={() => navigation.push('ProductDetail', { product: relatedProduct })}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <TouchableOpacity 
          style={[styles.addToCartButton, { backgroundColor: theme.surface, borderColor: theme.primary }]} 
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color={theme.primary} />
          <Text style={[styles.addToCartText, { color: theme.primary }]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buyNowButton, { backgroundColor: theme.primary }]} 
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Buy Now - ${product.price * quantity}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  arButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  quantityButton: {
    padding: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresContainer: {
    marginTop: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 8,
  },
  relatedSection: {
    marginTop: 32,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  relatedProducts: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  relatedProductCard: {
    width: 160,
    marginRight: 12,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  buyNowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;