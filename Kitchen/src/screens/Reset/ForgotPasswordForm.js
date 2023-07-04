import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const ForgotPasswordForm = ({navigation,route}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (text) => {
    console.log(text)
    setEmail(text);
  };

  const handleSubmit = () => {
    // Send API request to the backend server
    axios  
      .post("http://192.168.18.14:3500/reset", {email})
      .then((response) => {
        setMessage(response.data.message);
        if(response.data.success){
          navigation.navigate('ForgotPasswordConfirmation',{email})
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={handleEmailChange}
      />
      <Button
        title="Reset Password"
        onPress={handleSubmit}
        color="#FF6F61"
      />
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: "red",
  },
});

export default ForgotPasswordForm;
