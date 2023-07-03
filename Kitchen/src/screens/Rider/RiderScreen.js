import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RiderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [customerName, setCustomerName] = useState("");

  const navigateToEditProfile = async () => {
    const userId = await AsyncStorage.getItem("userId");
    navigation.navigate("EditProfile", { userId });
  };

  const fetchProfilePicture = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3500/user/${userId}`);
      const profilePicture = response.data.image;
      const customerName = response.data.fullName;
      setProfilePicture(profilePicture);
      setCustomerName(customerName);
    } catch (error) {
      console.log("Error fetching profile Picture:", error);
    }
  };

  const getOrderPickupDetails = async () =>{
    try{
       const response =  await axios.get("http://localhost:3500/pickups")
       setOrders(response.data);
       console.log(response.data)
      }catch(err){
        console.log(err);
      }
  };
  
  const delivered = async () => {
    try{
      await axios.delete("http://localhost:3500/pickups")

    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      getOrderPickupDetails();
      fetchProfilePicture();
    })();
  }, []);

  const renderOrder = ({ item }) => {
      return (
        <View style={styles.orderItem}>
          <Text style={styles.orderName}>Customer Name: {item.customerName}</Text>
          <Text style={styles.orderPrice}>Total Price: {item.totalPrice}</Text>
          <Text style={styles.orderPrice}>Address: {item.address}</Text>
          <Text style={styles.orderPrice}>Phone Number: {item.phoneNumber}</Text>
          <TouchableOpacity
              style = {styles.delivered}
              onPress={() => delivered(item)}>
              <Text>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.delivered}
              // onPress={() => delivered(item)}
              >
              <Text>Reject</Text>
            </TouchableOpacity>
          <TouchableOpacity
              style = {styles.delivered}
              onPress={() => delivered(item)}>
               <Text>Delivered</Text>
            </TouchableOpacity>
        </View>
      );
    }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity
          style={styles.profilePictureContainer}
          onPress={() => navigateToEditProfile()}
        >
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome, {customerName}</Text>
      </View>
    <Text style={styles.heading}>Orders ready for pickup</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#333",
    textAlign:"center"
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
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
  delivered: {
    backgroundColor: "#FF6F61",
    padding: 8,
    alignItems:"flex-center" ,
    marginLeft: 180,
    width:100
  },
});

export default RiderScreen;
