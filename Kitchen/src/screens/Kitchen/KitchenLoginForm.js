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
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const KitchenLoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('bisma00khalid@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [emailError, setEmailError] = useState("");
  const [passError,setPassError] = useState("");
  const [error,setError] = useState("");

  const handleLogin = async() => {
    console.log("Email: " + email);
    const data = {
      email: email,
      password: password,
      userType: "kitchen"
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
      .then((response) => {
        console.log(response.data);
        AsyncStorage.setItem("userId", response.data.userId);

        AsyncStorage.setItem("token", response.data.token).then(() => {
          console.log("Token stored");
          navigation.navigate("Welcome");
        });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.message === "Invalid login credentials") {
              setError( error.response.data.message); 
            } else if (error.response.data.message === "Account send for approval") {
              setError( error.response.data.message);  
            }else if (error.response.data.message === "You are not registered as a kitchen") {
              setError( error.response.data.message);  
            }
          }
        } else {
          console.error('Error:', error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
       
          <Text style={styles.title}>Kitchen Login</Text>
        
      </View>
     
     <View style={styles.lowerContainer}>
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      > 
      <Text style={styles.resetText}>Forgot password?</Text>
      </TouchableOpacity>

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
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </TouchableOpacity>
      
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09605e",
  },
  upperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "fit",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    flex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginLeft:40,
    marginRight:40
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10, 
    marginBottom: 10, 
    backgroundColor: "#fff",
    color: "#333",
    marginLeft:40,
    marginRight:40
  },
  loginButton: {
    backgroundColor: "#09605e",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft:40,
    marginRight:40
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
  error: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
    
  },
  errText: {
    color: "red",
    marginLeft:40,
    marginRight:40
  },
  resetText: {
    margin: 10,
    marginRight:40,
    textAlign: "right",
    color: "#888",
  },
   
});

export default KitchenLoginForm;

