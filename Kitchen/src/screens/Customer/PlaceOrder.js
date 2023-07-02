import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function PlaceOrder({ navigation }) {
  const state = useSelector((state) => state);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  console.log(state);

  useEffect(() => {}, [state]);
  const handleConfirmOrder = () => {
    if (state.cart.items.length > 0) {
      axios
        .post("http://192.168.100.53:3500/orders/", {
          customerName: state.user.user.name,
          address: state.user.user.address,
          phoneNumber:state.user.user.phoneNumber,
          foodItems: state.cart.items,
          totalPrice: state.cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
          kitchenName: state.cart.items[0].kitchen.fullName,
          paymentMethod,
        })
        .then((response) => {
          console.log(response.data);
          navigateToOrderConfirmed();
        })
        .catch((error) => console.log(error));
    }
  };

  const navigateToOrderConfirmed = () => {
    navigation.navigate("OrderPlaced");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer Name:</Text>
      <Text style={styles.text}>{state.user.user.name}</Text>

      <Text style={styles.label}>Customer Address:</Text>
      <Text style={styles.text}>{state.user.user.address}</Text>
      <Text style={styles.label}>Kitchen Name:</Text>
      <Text style={styles.text}>{state.cart.items[0].kitchen.fullName}</Text>
      <Text style={styles.label}>Total Price:</Text>
      <Text style={styles.text}>
        $
        {state.cart.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </Text>

      <Text style={styles.label}>Select Payment Method:</Text>
      <TouchableOpacity
        style={[
          styles.button,
          paymentMethod === "Cash on Delivery" && styles.selectedButton,
        ]}
        onPress={() => setPaymentMethod("Cash on Delivery")}
      >
        <Text
          style={[
            styles.buttonText,
            paymentMethod === "Cash on Delivery" && styles.selectedButtonText,
          ]}
        >
          Cash on Delivery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          paymentMethod === "Card" && styles.selectedButton,
        ]}
        onPress={() => setPaymentMethod("Card")}
      >
        <Text
          style={[
            styles.buttonText,
            paymentMethod === "Card" && styles.selectedButtonText,
          ]}
        >
          Card
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmOrder}
      >
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#3377FF",
  },
  selectedButtonText: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#3377FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
