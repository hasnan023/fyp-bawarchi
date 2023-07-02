import axios from "axios";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

const CustomerRegisterForm = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [emailErr,setEmailErr] = useState("");
  const [nameErr,setNameErr]  = useState("");
  const [addressErr,setAddressErr] = useState("");
  const [phoneNumberErr,setPhoneNumberErr] = useState("");
  const [passwordErr,setPasswordErr] = useState("");
  const [imageErr,setImageErr] = useState("");


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageErr("");
    }
  };

  const handleRegistration = async() => {
 if(fullName.length < 3){
  setNameErr("Name should be at least 3 characters long");
  return;
  }
  if(!email){
    setEmailErr("Email is required");
    return;
  }
  if(!email.includes("@") || !email.includes(".")){
    setEmailErr(`Email must include "@" and a "."`);
    return;
  }
  if(!address){
    setAddressErr("Address is required.");
    return;
  }
  // if(address.length < 3){
  //   setAddressErr("Address should be at least 3 characters long");
  //   return;
  //   }
  if(!phoneNumber){
    setPhoneNumberErr("Phone number is required.");
    return;
    }
    // if(phoneNumber){
    //   setPhoneNumberErr("Phone number should be at least 3 characters long");
    //   return;
    //   }

      if(!password){
        setPasswordErr("Password is required.");
        return;
        }

        if(password.length < 8){
          setPasswordErr("Password should be at least 8 characters long");
          return;
          }
    
          if(!image){
            setImageErr("Image is required.");
            return;
          }

    const customerData = {
      fullName,
      email,
      address,
      phoneNumber,
      password,
      userType: "customer",
      image,
    };

    try{
      const response = await axios.post("http://192.168.100.53:3500/user/register", customerData)
       console.log(response)
      navigation.navigate("CustomerLogin")
    }catch(error){
    console.log(error.message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Registration</Text>

      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={(fullName)=>{setFullName(fullName);
        setNameErr("")}}
        style={styles.input}
      />
       {nameErr ? <Text style={styles.errText}>{nameErr}</Text>:null}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email)=>{setEmail(email);
          setEmailErr("")}}
        style={styles.input}
      />
       {emailErr ? <Text style={styles.errText}>{emailErr}</Text>:null}

      <Text style={styles.label}>Address:</Text>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={(address)=>{setAddress(address);
          setAddressErr("")}}
        style={styles.input}
      />
 {addressErr ? <Text style={styles.errText}>{addressErr}</Text>:null}
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        keyboardType="numeric"
        onChangeText={(phoneNumber)=>{setPhoneNumber(phoneNumber);
          setPhoneNumberErr("")}}
        style={styles.input}
      />
       {phoneNumberErr ? <Text style={styles.errText}>{phoneNumberErr}</Text>:null}

      <Text style={styles.label}>Password:</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(password)=>{setPassword(password);
        setPasswordErr("")}}
        style={styles.input}
      />
 {passwordErr ? <Text style={styles.errText}>{passwordErr}</Text>:null}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={pickImage}
      >
        
        <Text style={styles.buttonText}>Select Profile Picture</Text>
      </TouchableOpacity>
      {imageErr ? <Text style={styles.errText}>{imageErr}</Text>:null}
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
          navigation.navigate("CustomerLogin");
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
  errText:{
    color:"red"
  },
});

export default CustomerRegisterForm;
