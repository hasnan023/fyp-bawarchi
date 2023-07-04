import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ maxStars, rating, onStarPress }) => {
  const [selectedStars, setSelectedStars] = useState(rating);

  const handleStarPress = (star) => {
    setSelectedStars(star);
    onStarPress(star);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={selectedStars >= i ? 'ios-star' : 'ios-star-outline'}
            size={32}
            color="#fbc02d"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;
