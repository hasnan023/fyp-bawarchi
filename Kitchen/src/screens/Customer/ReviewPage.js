import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';
// import StarRating from 'react-native-star-rating';

const ReviewsPage = ({ route }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);

  // useEffect(() => {
  //   fetchReviews();
  // }, [])

  // const fetchReviews = async () => {
  //   const kitchenId = route.params.kitchenId;
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3500/reviews/${kitchenId}/reviews`
  //     );
  //     const reviewsData = response.data;
  //     setReviews(reviewsData);
  //   } catch (error) {
  //     console.log('Error fetching reviews:', error);
  //   }
  // };

  // const handleReviewSubmit = async () => {
  //   const kitchenId = route.params.kitchenId;
  //   try {
  //     await axios.post(`http://localhost:3500/reviews/${kitchenId}/reviews`, {
  //       rating: starRating,
  //       review: reviewText,
  //     });
  //     fetchReviews(); // Refresh the reviews list
  //     setReviewText('');
  //     setStarRating(0);
  //   } catch (error) {
  //     console.log('Error submitting review:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.addReviewContainer}>
        <Text style={styles.addReviewTitle}>Write a Review</Text>
        {/* <StarRating
          disabled={false}
          maxStars={1}
          rating={starRating}
          selectedStar={(rating) => setStarRating(rating)}
          fullStarColor="#fbc02d"
        /> */}
        <TextInput
          style={styles.reviewTextInput}
          placeholder="Enter your review"
          value={reviewText}
          onChangeText={(text) => setReviewText(text)}
        />
        <Button
          title="Submit Review"
          // onPress={handleReviewSubmit}
          disabled={!reviewText || starRating === 0}
        />
      </View>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewText}>{item.review}</Text>
              <StarRating
                disabled={true}
                maxStars={1}
                rating={item.rating}
                starSize={20}
                fullStarColor="#fbc02d"
              />
            </View>
          )}
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
