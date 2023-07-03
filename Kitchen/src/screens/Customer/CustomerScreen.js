import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../features/UserSlice";

// const Drawer = createDrawerNavigator();

const CustomerScreen = ({ navigation }) => {
  const [kitchens, setKitchens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [customerName, setCustomerName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchKitchens();
    fetchProfilePicture();
  }, []);

  const navigateToKitchenDetail = (kitchenId) => {
    console.log(customerName)
    console.log(kitchenId)
    navigation.navigate("KitchenDetail", { kitchenId }, customerName);
  };

  const navigateToEditProfile = async () => {
    const userId = await AsyncStorage.getItem("userId");
    navigation.navigate("EditProfile", { userId });
  };

  const navigateToChefScreen = () => {
    navigation.navigate("ChefDisplay");
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

  const fetchKitchens = async () => {
    try {
      const response = await axios.get("http://localhost:3500/kitchen");
      setKitchens(response.data);
    } catch (error) {
      console.log("Error fetching kitchens:", error);
    }
  };

  const filteredKitchens = kitchens.filter((kitchen) =>
    kitchen.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderKitchenCard = ({ item }) => (

    <View style={styles.kitchenCard}>
      <TouchableOpacity onPress={() => navigateToKitchenDetail(item._id)}>
        <Image source={{ uri: item.image }} style={styles.kitchenImage} />
        <Text style={styles.kitchenName}>{item.fullName}</Text>
        <Text style={styles.kitchenCuisine}>{item.expertise}</Text>
        <Text style={styles.kitchenAddress}>{item.address}</Text>
      </TouchableOpacity>
    </View>
  );


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
        {/* <TouchableOpacity
          style={styles.chefButton}
          onPress={() => navigateToChefScreen()}
        >
          <Text style={styles.chefButtonText}>Chef</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.chefButton}
          onPress={async () => {dispatch(logout())
          await AsyncStorage.clear()}}
        >
          <Text style={styles.chefButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for kitchens"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredKitchens}
        keyExtractor={(item) => item._id}
        renderItem={renderKitchenCard}
        contentContainerStyle={styles.kitchenList}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#333",
    textAlign:"center"
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  kitchenList: {
    paddingBottom: 16,
  },
  kitchenCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  kitchenImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  kitchenCuisine: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  kitchenAddress: {
    fontSize: 14,
    color: "#888",
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

export default CustomerScreen;
