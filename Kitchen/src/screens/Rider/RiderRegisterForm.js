import axios from "axios";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const RiderRegisterForm = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

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
    }};

  const handleRegistration = () => {
    const riderData = {
      fullName,
      email,
      address,
      phoneNumber,
      password,
      userType: "rider",
      image,
      CNIC,
      vehicleNumber
    };
    axios
      .post("http://localhost:3500/user/register", riderData)
      .then((res) => {
        console.log(res.data);
        navigation.navigate("RiderLogin")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>CNIC:</Text>
      <TextInput
        placeholder="CNIC"
        secureTextEntry
        value={CNIC}
        onChangeText={setCNIC}
        style={styles.input}
      />
      <Text style={styles.label}>vehicle Number:</Text>
      <TextInput
        placeholder="Vehicle Number "
        secureTextEntry
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        style={styles.input}
      />
     
      <Button title="Select Profile Picture" onPress={pickImage} />
      
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Button title="Register" onPress={handleRegistration}/>
      <TouchableOpacity
        onPress={() => {
          {
            navigation.navigate("RiderLogin");
          }
        }}
      >
        <Text> Already have an account? Login!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});
export default RiderRegisterForm;
