import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Button, Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";  

const OrderDisplay = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
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
  };

  useFocusEffect(
    React.useCallback(() => {
      setOrders([]);
      getOrders();
    }, [])
  );

  const renderOrder = ({ item: order }) => {
    return (
      <TouchableOpacity style={styles.orderItem}>
        <Image style={styles.orderImage} source={{ uri: order.image }} />
        <View style={styles.orderDetails}>
          <Text style={styles.orderName}>{order.customerName}</Text>
          <Text style={styles.orderDescription}>{order.foodItems}</Text>
          <Text style={styles.orderPrice}>Rs. {order.totalPrice}</Text>
        </View>
        
      </TouchableOpacity>
    );
  };

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007AFF",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
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
});

export default OrderDisplay;
