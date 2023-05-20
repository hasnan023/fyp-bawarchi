import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const KitchenDetail = ({ route }) => {
  const [kitchen, setKitchen] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchKitchenDetail();
  }, []);

  const fetchKitchenDetail = async () => {
    const kitchenId = route.params.kitchenId;
    try {
      const response = await axios.get(`http://localhost:3500/kitchen/${kitchenId}`);
      // console.log(kitchenId)
      const { kitchen, foodItems } = response.data;
      setKitchen(kitchen);
      setFoodItems(foodItems.map((item) => ({ ...item, quantity: 0 })));
    } catch (error) {
      console.log('Error fetching kitchen detail:', error);
    }
  };

  const incrementQuantity = (item) => {
    setFoodItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
      )
    );
  };

  const decrementQuantity = (item) => {
    setFoodItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id && prevItem.quantity > 0
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
  };

  const addToCart = (item) => {
    if (item.quantity > 0) {
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        updatedCartItems.push({ ...item });
      }

      setCartItems(updatedCartItems);
      setFoodItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, quantity: 0 } : prevItem
        )
      );
    }
  };

  const renderFoodItemCard = ({ item }) => (
    <View style={styles.foodItemCard}>
      <Image source={{ uri: item.image }} style={styles.foodItemImage} />
      <Text style={styles.foodItemName}>{item.name}</Text>
      <Text style={styles.foodItemPrice}>Price: ${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => incrementQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => decrementQuantity(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item)}
        disabled={item.quantity === 0}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (!kitchen) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.kitchenDetailsContainer}>
        <Image source={{ uri: kitchen.image }} style={styles.kitchenImage} />
        <View style={styles.kitchenInfoContainer}>
          <Text style={styles.kitchenName}>{kitchen.fullName}</Text>
          <Text style={styles.kitchenCuisine}>{kitchen.expertise}</Text>
          <Text style={styles.kitchenAddress}>{kitchen.address}</Text>
        </View>
      </View>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item._id}
        renderItem={renderFoodItemCard}
        contentContainerStyle={styles.foodItemList}
        numColumns={2}
      />
      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Cart</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
          ))
        )}
        <Text style={styles.totalText}>
          Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kitchenDetailsContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  kitchenImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  kitchenInfoContainer: {
    alignItems: 'center',
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  kitchenCuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  kitchenAddress: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
  },
  foodItemList: {
    paddingBottom: 16,
  },
  foodItemCard: {
    flex: 0.5,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  foodItemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  foodItemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#3377FF',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartContainer: {
    marginTop: 16,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default KitchenDetail;
