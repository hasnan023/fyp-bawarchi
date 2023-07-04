import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
  removeFromCart,
} from "../../features/BasketSlice";
import StarRating from "./StarRating";


const KitchenDetail = ({ route, navigation }) => {
  const [kitchen, setKitchen] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const state = useSelector((state) => state);
  const [cartItems, setCartItems] = useState(state.cart.items);
  const customerName = route.params.customerName;
  const [averageStars, setAverageStars] = useState(0); 
  const kitchenId = route.params.kitchenId;
  
  const RenderFoodItemCard = ({ item, kitchen }) => {
    const [quantity, setQuantity] = useState(0);
    const items = useSelector(selectCartItems);
    const dispatch = useDispatch();
   
    const incrementQuantity = (item) => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };
  
    const decrementQuantity = (item) => {
      setQuantity((prevQuantity) => (prevQuantity === 0 ? 0 : prevQuantity - 1));
    };
  
    const handleAddToCart = () => {
      dispatch(
        addToCart({
          kitchen: {
            fullName: kitchen.fullName,
            _id: kitchen._id,
          },
          name: item.name,
          id: item._id,
          price: item.price,
          quantity,
        })
      );
    };
  
    return (
      <View style={styles.foodItemCard}>
        <Image source={{ uri: item.image }} style={styles.foodItemImage} />
        <Text style={styles.foodItemName}>{item.name}</Text>
        <Text style={styles.foodItemPrice}>Price: ${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => incrementQuantity()}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => decrementQuantity()}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={quantity === 0}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  
  useEffect(() => {
    fetchKitchenDetail();
    calculateAverageStars();
  }, []);

  useEffect(() => {
    setCartItems(state.cart.items);
  }, [state]);

  const handleReview = async () => {
    const kitchenId = route.params.kitchenId;
    navigation.navigate('Review',{kitchenId},{customerName})
  }

  const calculateAverageStars = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/reviews/${kitchenId}`);
      const reviews = response.data;
  
      if (reviews.length > 0) {
        const sumStars = reviews.reduce((total, review) => total + review.rating, 0);
        const average = sumStars / reviews.length;
        setAverageStars(average);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  const fetchKitchenDetail = async () => {
    const kitchenId = route.params.kitchenId;
    try {
      const response = await axios.get(
        `http://localhost:3500/kitchen/${kitchenId}`
      );

      const { kitchen, foodItems } = response.data;

      setKitchen(kitchen);
      setFoodItems(foodItems.map((item) => ({ ...item, quantity: 0 })));
    } catch (error) {
      console.log("Error fetching kitchen detail:", error);
    }
  };

  if (!kitchen) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.kitchenDetailsContainer}>
      <Image source={{ uri: kitchen.image }} style={styles.kitchenImage} />
      <View style={styles.kitchenInfoContainer}>
        <View style={styles.ratingAndReviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{averageStars.toFixed(1)}</Text>
          <StarRating
            disabled={true}
            maxStars={1}
            rating={1}
            starSize={20}
            fullStarColor="#fbc02d"
          />
      </View>
          <TouchableOpacity style={styles.reviewButton} onPress={() => handleReview()}>
            <Text style={styles.reviewButtonText}>Reviews</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.kitchenName}>{kitchen.fullName}</Text>
        <Text style={styles.kitchenCuisine}>{kitchen.expertise}</Text>
        <Text style={styles.kitchenAddress}>{kitchen.address}</Text>
      </View>
      <View style={styles.itemsContainer}>
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <RenderFoodItemCard kitchen={kitchen} item={item} />
          ))
        ) : (
          <Text>No Items Posted Yet</Text>
        )}
      </View>

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Cart</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <View>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => navigation.navigate("CartScreen")}
            >
              <Text style={styles.addToCartButtonText}>Go To Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.totalText}>
          Total Items:{" "}
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  kitchenDetailsContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  kitchenImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  kitchenInfoContainer: {
    alignItems: "center",
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    textAlign: "center",
  },
  kitchenCuisine: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  kitchenAddress: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
    textAlign: "center",
  },
  foodItemList: {
    paddingBottom: 16,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  
  ratingAndReviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    marginRight: 8,
  },
  reviewButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6F61",
  },  
  foodItemCard: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },  
  foodItemImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    textAlign: "center",
  },
  foodItemPrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quantityButton: {
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: "#3377FF",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cartContainer: {
    marginTop: 16,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
});

export default KitchenDetail;
