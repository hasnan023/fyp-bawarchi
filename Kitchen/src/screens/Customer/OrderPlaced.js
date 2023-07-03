import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderPlaced({ navigation }) {
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    // Load the order status from AsyncStorage when the component mounts
    loadOrderStatus();
  }, []);

  useEffect(() => {
    // Save the order status to AsyncStorage whenever it changes
    saveOrderStatus();
  }, [orderStatus]);

  const loadOrderStatus = async () => {
    try {
      const storedOrderStatus = await AsyncStorage.getItem("orderStatus");
      if (storedOrderStatus !== null) {
        setOrderStatus(storedOrderStatus);
      } else {
        // If no order status is stored, set the default status
        setOrderStatus("Placed");
      }
    } catch (error) {
      console.log("Error loading order status:", error);
    }
  };

  const saveOrderStatus = async () => {
    try {
      await AsyncStorage.setItem("orderStatus", orderStatus);
    } catch (error) {
      console.log("Error saving order status:", error);
    }
  };

  const handleGoBack = () => {
    // Navigate back to the home screen
    navigation.navigate("CustomerScreen");
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Placed</Text>
      <Text style={styles.status}>Order Status: {orderStatus}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOrderStatus("Preparing")}
      >
        <Text style={styles.buttonText}>Start Preparing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOrderStatus("Ready")}
      >
        <Text style={styles.buttonText}>Order Ready</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3377FF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
