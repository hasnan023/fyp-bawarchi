import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerOrder = ({navigation}) => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://192.168.18.14:3500/orders");
        const ordersData = response.data;
        const userId = await AsyncStorage.getItem("userId");
  
        // Filter orders based on userId
        const filteredOrders = ordersData.filter(
          (order) => order.customerId === userId
        );
  
        setOrders(filteredOrders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
  
    const renderOrder = ({ item }) => (
      <View style={styles.orderItem}>
        <Text style={styles.orderInfo}>Kitchen Name: {item.kitchenName}</Text>
        <Text style={styles.orderInfo}>Date: {item.createdAt}</Text>
        <Text style={styles.orderInfo}>Total: ${item.totalPrice}</Text>
      
    {item.status === "Processing" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "red" }}>
        Status: {item.status}
      </Text>
    )}
    {item.status === "Preparing" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "orange" }}>
        Status: {item.status}
      </Text>
    )}
    {item.status === "Picked up" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "purple" }}>
        Status: {item.status}
      </Text>
    )}
    {item.status === "Delivered" && (
      <Text style={{ fontSize: 16, marginBottom: 8, color: "green" }}>
        Status: {item.status}
      </Text>
    )}
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order History</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrder}
          contentContainerStyle={styles.orderList}
        />
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
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
    },
    orderList: {
      paddingBottom: 16,
    },
    orderItem: {
      marginBottom: 16,
      borderRadius: 8,
      backgroundColor: "#fff",
      padding: 16,
    },
    orderInfo: {
      fontSize: 16,
      marginBottom: 8,
    },
  });
  
  export default CustomerOrder;
  