import axios from "axios";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Picker
} from "react-native";

const KitchenRegisterForm = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [expertise, setExpertise] = useState("");
  const [image, setImage] = useState("");

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
      setImage(result.uri);
    }
  };
    
  const handleRegistration = () => {
    const kitchenData = {
      fullName,
      email,
      address,
      phoneNumber,
      password,
      userType: "kitchen",
      image,
      expertise
    };

    axios
      .post("http://localhost:3500/user/register", kitchenData)
      .then((res) => {
        console.log(res.kitchenData);
        navigation.navigate("KitchenLogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitchen Registration</Text>

      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <Text style={styles.label}>Phone number:</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Picker
        selectedValue={expertise}
        onValueChange={(itemValue) => setExpertise(itemValue)} 
        style={styles.picker}
      >
        <Picker.Item label="Select Expertise" value="" />
        <Picker.Item label="Pakistani" value="Pakistani" />
        <Picker.Item label="Chinese" value="Chinese" />
        <Picker.Item label="Continental" value="Continental" />
        <Picker.Item label="Italian" value="Italian" />
      </Picker>

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
        onPress={handleRegistration}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("KitchenLogin");
        }}
      >
        <Text style={styles.loginText}>Already have an account? Login!</Text>
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

export default KitchenRegisterForm;
