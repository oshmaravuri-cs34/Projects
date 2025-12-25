import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const ProductReviews = ({ product, visible, onClose }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Excellent product! Highly recommended.',
      date: '2024-01-15',
      helpful: 12,
      images: [],
      verified: true,
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Good quality, fast delivery. Minor issues with packaging.',
      date: '2024-01-10',
      helpful: 8,
      images: [],
      verified: true,
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 5,
      comment: 'Perfect! Exactly what I was looking for.',
      date: '2024-01-08',
      helpful: 15,
      images: [],
      verified: false,
    },
  ]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [sortBy, setSortBy] = useState('newest');

  const renderStars = (rating, size = 16, interactive = false, onPress) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => interactive && onPress && onPress(i)}
          disabled={!interactive}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={size}
            color="#FFD700"
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const handleAddReview = () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to add a review');
      return;
    }
    
    if (newReview.comment.trim().length < 10) {
      Alert.alert('Invalid Review', 'Please write at least 10 characters');
      return;
    }

    const review = {
      id: Date.now(),
      user: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      images: [],
      verified: true,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowAddReview(false);
    Alert.alert('Success', 'Review added successfully!');
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100,
  }));

  const AddReviewModal = () => (
    <Modal visible={showAddReview} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={() => setShowAddReview(false)}>
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: theme.text }]}>Write Review</Text>
          <TouchableOpacity onPress={handleAddReview}>
            <Text style={[styles.submitText, { color: theme.primary }]}>Submit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={[styles.ratingLabel, { color: theme.text }]}>Rating</Text>
          {renderStars(newReview.rating, 32, true, (rating) => 
            setNewReview({ ...newReview, rating })
          )}

          <Text style={[styles.commentLabel, { color: theme.text }]}>Comment</Text>
          <TextInput
            style={[styles.commentInput, { 
              backgroundColor: theme.surface, 
              color: theme.text,
              borderColor: theme.border 
            }]}
            value={newReview.comment}
            onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
            placeholder="Share your experience with this product..."
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{t('reviews')}</Text>
          <TouchableOpacity onPress={() => setShowAddReview(true)}>
            <Ionicons name="add" size={24} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Rating Overview */}
          <View style={[styles.ratingOverview, { backgroundColor: theme.surface }]}>
            <View style={styles.averageRating}>
              <Text style={[styles.averageNumber, { color: theme.text }]}>
                {averageRating.toFixed(1)}
              </Text>
              {renderStars(Math.round(averageRating), 20)}
              <Text style={[styles.totalReviews, { color: theme.textSecondary }]}>
                {reviews.length} {t('reviews')}
              </Text>
            </View>

            <View style={styles.ratingBars}>
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <View key={rating} style={styles.ratingBar}>
                  <Text style={[styles.ratingNumber, { color: theme.textSecondary }]}>
                    {rating}
                  </Text>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <View style={[styles.barBackground, { backgroundColor: theme.border }]}>
                    <View 
                      style={[styles.barFill, { 
                        width: `${percentage}%`,
                        backgroundColor: theme.primary 
                      }]} 
                    />
                  </View>
                  <Text style={[styles.ratingCount, { color: theme.textSecondary }]}>
                    {count}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Sort Options */}
          <View style={[styles.sortContainer, { backgroundColor: theme.surface }]}>
            <Text style={[styles.sortLabel, { color: theme.text }]}>Sort by:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { key: 'newest', label: 'Newest' },
                { key: 'helpful', label: 'Most Helpful' },
                { key: 'highest', label: 'Highest Rating' },
                { key: 'lowest', label: 'Lowest Rating' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.sortOption,
                    { 
                      backgroundColor: sortBy === option.key ? theme.primary : theme.background,
                      borderColor: theme.border 
                    }
                  ]}
                  onPress={() => setSortBy(option.key)}
                >
                  <Text style={[
                    styles.sortOptionText,
                    { color: sortBy === option.key ? 'white' : theme.text }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            {sortedReviews.map(review => (
              <View key={review.id} style={[styles.reviewItem, { 
                backgroundColor: theme.surface,
                borderBottomColor: theme.border 
              }]}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUser}>
                    <Text style={[styles.userName, { color: theme.text }]}>
                      {review.user}
                    </Text>
                    {review.verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={14} color="#06FFA5" />
                        <Text style={styles.verifiedText}>Verified</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.reviewDate, { color: theme.textSecondary }]}>
                    {review.date}
                  </Text>
                </View>

                {renderStars(review.rating)}

                <Text style={[styles.reviewComment, { color: theme.text }]}>
                  {review.comment}
                </Text>

                <View style={styles.reviewActions}>
                  <TouchableOpacity 
                    style={styles.helpfulButton}
                    onPress={() => handleHelpful(review.id)}
                  >
                    <Ionicons name="thumbs-up-outline" size={16} color={theme.textSecondary} />
                    <Text style={[styles.helpfulText, { color: theme.textSecondary }]}>
                      Helpful ({review.helpful})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <AddReviewModal />
      </SafeAreaView>
    </Modal>
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
  ratingOverview: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 8,
  },
  averageRating: {
    flex: 1,
    alignItems: 'center',
  },
  averageNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
  },
  ratingBars: {
    flex: 1,
    marginLeft: 20,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingNumber: {
    width: 12,
    fontSize: 12,
  },
  barBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  ratingCount: {
    width: 20,
    fontSize: 12,
    textAlign: 'right',
  },
  sortContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  sortOptionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reviewsList: {
    paddingHorizontal: 16,
  },
  reviewItem: {
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#06FFA5',
    marginLeft: 2,
  },
  reviewDate: {
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  reviewActions: {
    flexDirection: 'row',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
});

export default ProductReviews;