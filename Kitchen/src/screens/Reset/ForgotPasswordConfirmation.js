import React, { useState } from "react";
import { View, Text,StyleSheet} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import axios from "axios";

const ForgotPasswordConfirmation = ({navigation, route}) => {
  const {email} = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if(newPassword !== confirmPassword){
      setMessage('Passwords do not match');
      return;
    }
    
      const data = {
        email:email,
        verificationCode: verificationCode,
        password: newPassword
      };

      await axios  
      .post("http://localhost:3500/reset/confirm", data)
      .then((response) => {
        console.log(response)
        navigation.navigate("Signin");
      })
      .catch((err)=>{
      console.error("Error:", err);
      alert(`Something went wrong! ${err}`)
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Confirmation</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        mode="outlined"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
      />
       <TextInput
         style={styles.input}
         placeholder="New Password"
         mode="outlined"
         secureTextEntry
         value={newPassword}
         onChangeText={(text) => setNewPassword(text)}
       />
      <TextInput
         style={styles.input}
         placeholder="Confirm New Password"
         mode="outlined"
         secureTextEntry
         value={confirmPassword}
         onChangeText={(text) => setConfirmPassword(text)}
       />
      <Button
        title="Submit"
        onPress={handleSubmit}
        color="#09605e"
      />
      <Text>Try to login</Text>
      
      {/* <Button
        onPress={handleResendCode}
        style={styles.resendButton}
      >Resend Code</Button> */}
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent:"center"
  },
  title: {
    fontSize: 20,
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
  resendButton:{
    margintop:8,
    backgroundColor:'transparent'
  }
});

export default ForgotPasswordConfirmation;
