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
import { useDispatch } from "react-redux";
import { login } from "../../features/UserSlice";
const CustomerLoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:3500/user/login", data);
      dispatch(login(res.data));

      await AsyncStorage.setItem("profilePicture", res.data.profilePicture);

      navigation.navigate("CustomerScreen");
    } catch (err) {
      console.log("error: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='Enter your email'
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder='Enter your password'
      />

      <Button title='Login' onPress={handleLogin} />
      <TouchableOpacity
        onPress={() => {
          {
            navigation.navigate("CustomerRegister");
          }
        }}
      >
        <Text> New to Bawarchi? Register!</Text>
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

export default CustomerLoginForm;
