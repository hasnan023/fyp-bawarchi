import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Button, Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";  

const FoodScreen = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [kitchenName, setKitchenName] = useState("");

  const getFoods = () => {
    console.log("get foods method called");
    AsyncStorage.getItem("token")
      .then((res) => {
        const token = res;
        console.log("Response: " + token);

        fetch("http://localhost:3500/food", {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        })
          .then((response) => response.json())
          .then((data) => setFoods(data))
          .catch((error) => console.error(error));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setFoods([]);
      getFoods();
      fetchProfilePicture();
    }, [])
  );

  const handleAddFood = () => {
    navigation.navigate("AddFoodItem");
  };
  const navigateToEditProfile = async () => {
    const userId = await AsyncStorage.getItem("userId");
    navigation.navigate("EditProfile", { userId });
  };

  const navigateToOrderScreen = async () => {
    navigation.navigate("OrderDisplay",{kitchenName});
  };

  const fetchProfilePicture = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId)
      const response = await axios.get(`http://localhost:3500/user/${userId}`);
      const profilePicture = response.data.image;
      const kitchenName = response.data.fullName;
      setProfilePicture(profilePicture);
      console.log(response.data)
      setKitchenName(kitchenName);
    } catch (error) {
      console.log("Error fetching profile Picture:", error);
    }
  };


  const renderFoodItem = ({ item: food }) => {
    return (
      <TouchableOpacity style={styles.foodItem}>
        <Image style={styles.foodImage} source={{ uri: food.image }} />
        <View style={styles.foodDetails}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.foodDescription}>{food.description}</Text>
          <Text style={styles.foodPrice}>Rs. {food.price}</Text>
        </View>
        <View style={styles.foodButtons}>
          <Button
            title="Edit"
            onPress={() => {
              navigation.navigate("EditFoodItem", { id: food._id });
              console.log(food);
            }}
            buttonStyle={styles.editButton}
          />
          <Button
            title="Delete"
            onPress={() => {
              navigation.navigate("DeleteFoodItem", { id: food._id });
            }}
            buttonStyle={styles.deleteButton}
          />
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.welcomeText}>Welcome, {kitchenName}</Text>
        <TouchableOpacity
          style={styles.chefButton}
          onPress={() => navigateToOrderScreen()}
        >
          <Text style={styles.chefButtonText}>Orders</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Food items in your Kitchen</Text>
      <FlatList
        data={foods}
        renderItem={renderFoodItem}
        keyExtractor={(food) => food._id}
        contentContainerStyle={styles.foodList}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddFood}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
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
  foodList: {
    paddingBottom: 16,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  foodDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodButtons: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
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

export default FoodScreen;
