// CustomerScreen.js
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

const ChefDisplay = ({ navigation }) => {
  const [chefs, setChefs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await axios.get("http://192.168.100.53:3500/chefs");
      console.log(response);
      setChefs(response.data);
    } catch (error) {
      console.log("Error fetching chefs:", error);
    }
  };

  const navigateToChefDetail = (chef) => {
    navigation.navigate("ChefDetail", { chef });
  };

  const filteredChefs = chefs.filter((chef) =>
    chef.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChefCard = ({ item }) => (
    <View style={styles.chefCard}>
      <TouchableOpacity onPress={() => navigateToChefDetail(item)}>
        <Image source={{ uri: item.image }} style={styles.chefImage} />
        <Text style={styles.chefName}>{item.fullName}</Text>
        <Text style={styles.chefCuisine}>{item.expertise}</Text>
      </TouchableOpacity>
    </View>
  );  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder='Search for chefs'
        placeholderTextColor='#888'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredChefs}
        keyExtractor={(item) => item._id}
        renderItem={renderChefCard}
        contentContainerStyle={styles.chefList}
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
  chefList: {
    paddingBottom: 16,
  },
  chefCard: {
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
  chefDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chefPhoneNumber: {
    fontSize: 14,
    color: "#888",
    marginRight: 8,
  },
  chefImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  chefName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  chefCuisine: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
});

export default ChefDisplay;
