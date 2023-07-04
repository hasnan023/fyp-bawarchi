import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';
import StarRating from './StarRating';

const ReviewsPage = ({ route }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);
  const kitchenId = route.params.kitchenId;
  const customerName = route.params.customerName;

  useEffect(() => {
    fetchReviews();
  }, [])

  const fetchReviews = async () => {
    try {
      console.log("hi")
      console.log(kitchenId)
      const response = await axios.get(
        `http://192.168.18.14:3500/reviews/${kitchenId}`
      );
      const reviewsData = response.data;
      setReviews(reviewsData);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  const handleReviewSubmit = async () => {
    const kitchenId = route.params.kitchenId;
    try {

      const data = {
        kitchenId:kitchenId,
        customerName:customerName,
        rating: starRating,
        review: reviewText,
      }; 
      console.log(customerName)

  
      await axios.post("http://192.168.18.14:3500/reviews", data);
      fetchReviews(); 
      setReviewText('');
      setStarRating(0);
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  const renderReviews = ({ item: review }) => {
    return (
      <View style={styles.reviewItem}>
        <Text style={styles.reviewText}>{review.customerName}</Text>
        <Text style={styles.reviewText}>{review.review}</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={review.rating}
          starSize={20}
          fullStarColor="#fbc02d"
        />
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.addReviewContainer}>
        <Text style={styles.addReviewTitle}>Write a Review</Text>
        <StarRating
          maxStars={5} // Set the maximum number of stars
          rating={starRating} // Pass the current rating value as a prop
          onStarPress={(rating) => setStarRating(rating)} // Pass a callback function to handle star press events
        />
        <TextInput
          style={styles.reviewTextInput}
          placeholder="Enter your review"
          value={reviewText}
          onChangeText={(text) => setReviewText(text)}
        />
        <Button
          title="Submit Review"
          onPress={handleReviewSubmit}
          disabled={!reviewText || starRating === 0}
        />
      </View>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          renderItem={renderReviews}
          keyExtractor={(review)=> review.id}
        />
      ) : (
        <Text>No reviews available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  addReviewContainer: {
    marginBottom: 16,
  },
  addReviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ReviewsPage;
