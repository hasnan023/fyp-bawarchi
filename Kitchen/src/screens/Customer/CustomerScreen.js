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
import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../features/UserSlice";

const Drawer = createDrawerNavigator();

const CustomerScreen = ({navigation}) => {
  const [kitchens, setKitchens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchKitchens();
    // fetchProfilePicture();
  }, []);

  const navigateToKitchenDetail =async (kitchenId) => {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(`http://192.168.18.14:3500/user/${userId}`);
        const customerName = response.data.fullName;
    navigation.navigate("KitchenDetail", { kitchenId }, customerName);
  };


  const fetchKitchens = async () => {
    try {
      const response = await axios.get("http://192.168.18.14:3500/kitchen");
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

  const Sidebar = () => {
    const [profilePicture, setProfilePicture] = useState("");
    const [customerName, setCustomerName] = useState("");
  
    useEffect(() => {
      fetchProfilePicture();
    }, []);
  
    const fetchProfilePicture = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(`http://192.168.18.14:3500/user/${userId}`);
        const profilePicture = response.data.image;
        const customerName = response.data.fullName;
        setProfilePicture(profilePicture);
        setCustomerName(customerName);
      } catch (error) {
        console.log("Error fetching profile Picture:", error);
      }
    };
  
    const navigateToEditProfile = async () => {
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("EditProfile", { userId });
    };
  
    const navigateToChefScreen = () => {
      navigation.navigate("ChefDisplay");
    };
  
    return (
      <View style={styles.sidebarContainer}>
       
        
        <Image
          source={{ uri: profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.customerName}>{customerName}</Text>

        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => navigateToEditProfile()}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => navigateToChefScreen()}
        >
          <Text>Chef</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => navigation.navigate("CustomerOrder")}
        >
          <Text>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("CartScreen")}
      >
        <FontAwesome name="shopping-cart" size={20} color="#333" />
        <Text style={styles.sidebarItemText}>Cart</Text>
      </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={async () => {
            dispatch(logout());
            navigation.navigate("CustomerLogin")
            await AsyncStorage.clear();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
      <Drawer.Navigator 
      drawerContent={Sidebar}>
        <Drawer.Screen name="Customer">
          {() => (
            <View style={styles.container}>

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
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
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
    color: "#333",
    textAlign: "center",
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
  profileContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 80,
    marginBottom: 8,
  },
  
  sidebarContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  sidebarItemText: {
    marginLeft: 8,
  },
  
});

export default CustomerScreen;
