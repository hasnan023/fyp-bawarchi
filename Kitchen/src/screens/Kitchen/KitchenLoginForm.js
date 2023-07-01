import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KitchenLoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passError,setPassError] = useState("");

  const handleLogin = () => {
    console.log("Email: " + email);
    const data = {
      email: email,
      password: password,
    };
    if(!email){
      setEmailError("Email is required");
      return;
    }
    if(!password){
      setPassError("Password is required.");
      return;
    }


    axios
      .post("http://localhost:3500/user/login", data)
      .then((res) => {
        console.log(res.data);

        AsyncStorage.setItem("token", res.data.token).then(() => {
          console.log("Token stored");

          navigation.navigate("Welcome");
        });
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitchen Login</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(email)=>{setEmail(email);
          setEmailError("")}}
        placeholder="Enter your email"
      />
      {emailError ? <Text style={styles.errText}>{emailError}</Text>:null}

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(password)=>{setPassword(password);
          setPassError("");
        }}
        secureTextEntry={true}
        placeholder="Enter your password"
        
      />
      {passError ? <Text style={styles.errText}>{passError}</Text>:null}

    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          {
            navigation.navigate("KitchenRegister");
          }
        }}
      >
        <Text style={styles.registerText}> New to Bawarchi? Register!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
    padding: 8, // Adjusted padding
    marginBottom: 8, // Adjusted marginBottom
    backgroundColor: "#fff",
    color: "#333",
  },
  loginButton: {
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
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "#888",
  },
  errText:{
    color:"red"
  },
});

export default KitchenLoginForm;

