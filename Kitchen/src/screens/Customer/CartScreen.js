import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

const CartScreen = ({ navigation }) => {
  const state = useSelector((state) => state);
  const [cartItems, setCartItems] = useState(state.cart.items);

  // const deleteItem = (id) => {
  //   deleteDoc(doc(db, "cart", `${id}`));
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <View>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                  style={{ width: "10%" }}
                  // onPress={() => {
                  //   deleteItem(item._id);
                  // }}
                >
                  <Icon name="delete" size={28} />
                </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.totalText}>
            Total Items:{" "}
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => navigation.navigate("PlaceOrder")}
          >
            <Text style={styles.addToCartButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
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
});

export default CartScreen;
