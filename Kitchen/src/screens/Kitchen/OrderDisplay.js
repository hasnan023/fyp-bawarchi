import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const OrderDisplay = ({ route }) => {
  const {kitchenName:kitchenName} = route.params;
  const [orders, setOrders] = useState([]);

  const sendToRider = async (item) => {
    try {
      const response = await axios.post("http://localhost:3500/pickups",item);
      console.log("testing")
    } catch (error) {
      console.log("Error adding order:", error);
    }
  };

  const renderOrder = ({ item }) => {
    if (item.kitchenName === kitchenName) {
      return (
        <View style={styles.orderItem}>
          <Text style={styles.orderName}>Customer Name: {item.customerName}</Text>
          <Text style={styles.orderPrice}>Total Price: {item.totalPrice}</Text>
          
          <Text style={styles.orderSubheading}>Food Items:</Text>
          {item.foodItems.map((foodItem, index) => (
            <View key={index} style={styles.foodItemContainer}>
              <Text style={styles.foodItemTitle}>Food Item {index + 1}:</Text>
              <Text>Name: {foodItem.name}</Text>
              <Text>Quantity: {foodItem.quantity}</Text>
              <Text>Price: {foodItem.price}</Text>
              <Text>Kitchen: {foodItem.kitchen.fullName}</Text>
              
              
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.preparingButton}>
                <Text style={styles.buttonText}>Preparing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pickupButton}
                onPress={() => sendToRider(item)}
              >
                <Text style={styles.buttonText}>Ready for Pickup</Text>
              </TouchableOpacity>
            </View>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((res) => {
        const token = res;
        console.log("Response: " + token);

        fetch("http://localhost:3500/orders", {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        })
          .then((response) => response.json())
          .then((data) => setOrders(data))
          .catch((error) => console.error(error));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Orders for your Kitchen</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(order) => order._id}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderList: {
    paddingBottom: 16,
  },
  orderItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  orderName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderSubheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  foodItemContainer: {
    marginLeft: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  foodItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pickup: {
    backgroundColor: "#FF6F61",
    padding: 8,
    alignItems:"flex-end" ,
    marginLeft: 180,
    width:100
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  profilePictureContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  chefButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chefButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  preparingButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  pickupButton: {
    backgroundColor: '#FF6F61',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

export default OrderDisplay;