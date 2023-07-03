import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddFoodScreen = ({ navigation }) => {
  const [name, setFoodName] = useState("");
  const [description, setFoodDescription] = useState("");
  const [price, setFoodPrice] = useState("");
  const [image, setFoodImage] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoodImage(result.uri);
    }
  };

  const saveFood = () => {
    const data = {
      name: name,
      description: description,
      price: price,
      image: image,
    };

    AsyncStorage.getItem("token").then((res) => {
      const token = res;
      axios
        .post("http://localhost:3500/food", data, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigation.navigate("Welcome");
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((error) => {
          console.error("Error saving food:", error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new Food Item</Text>
      <Text style={styles.label}>Food Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setFoodName}
        placeholder="Enter Food name"
      />

      <Text style={styles.label}>Food Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setFoodDescription}
        placeholder="Enter Food description"
      />

      <Text style={styles.label}>Food Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setFoodPrice}
        keyboardType="numeric"
        placeholder="Enter Food price"
      />

<TouchableOpacity
        style={styles.selectButton}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Select Profile Picture</Text>
      </TouchableOpacity>
      
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

    <TouchableOpacity
        style={styles.registerButton}
        onPress={saveFood}
      >
        <Text style={styles.buttonText}>Add Food Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
    selectButton: {
      backgroundColor: "#FF6F61",
      paddingVertical: 12,
      borderRadius: 4,
      marginBottom: 10,
    },
    registerButton: {
      backgroundColor: "#FF6F61",
      paddingVertical: 12,
      borderRadius: 4,
      marginBottom: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 10,
      alignSelf: "center",
    },
    loginText: {
      marginTop: 10,
      textAlign: "center",
      color: "#888",
    },
});

export default AddFoodScreen;
