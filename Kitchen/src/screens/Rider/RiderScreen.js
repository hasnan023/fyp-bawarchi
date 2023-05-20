import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RiderScreen = ({ navigation }) => {
  const [user, setRider] = useState([]);

  const getRider = async () => {
    console.log("get Rider details called");

    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      const res = await axios.get(`http://localhost:3500/user/${userId}`, {
        headers: { "x-auth-token": token },
      });
      console.log(res.data);
      setRider(res.data);
      console.log("test");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getRider();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Image
          style={styles.foodImage}
          source={{ uri: user.image }}
        ></Image>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.foodItem}>
            <View style={styles.infoContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.fullName}>{user.fullName}</Text>
                <Text style={styles.phoneNumber}>{user.vehicleNumber}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  foodItem: {
    marginBottom: 16,
  },
  foodImage: {
    width: 250,
    height: 150,
  },
  infoContainer: {
    marginLeft: 16,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 16,
    marginLeft: 16,
  },
  fab: {
    bottom: 16,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});

export default RiderScreen;
