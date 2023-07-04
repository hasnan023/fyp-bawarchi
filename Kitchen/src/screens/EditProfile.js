
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ route }) => {
    const { userId:id } = route.params;
    const [fullName, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
  
    useEffect(() => {
      fetchUserProfile();
    }, []);
  
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/user/${id}`);
        const {fullName, phoneNumber, email, image} = response.data;
        setName(fullName);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setImage(image);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    useEffect(()=>{
      console.log(fullName);
    },[fullName])
    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
    const handleSaveProfile = async () => {
      try {
        await axios.put(`http://localhost:3500/user/${id}`, {
          fullName: fullName,
          phoneNumber:phoneNumber,
          email:email,
          image:image,
        });
        navigation.navigate("");
      } catch (error) {
        console.log("Error saving user profile:", error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        {/* Add input fields for editing the user's profile data */}
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setName}
          placeholder="Name"
          
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <Button
          color="#FF6F61"
          title="Pick an image"
          onPress={handleImagePick}
        />
      </View>
        <Button color="#FF6F61"title="Save Profile" onPress={handleSaveProfile} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f9f9f9",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: "#fff",
      color: "#333",
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 8,
    },
    button: {
      backgroundColor:"#FF6F61",
      color:"red"
    }
  });
  
  export default EditProfile;
  