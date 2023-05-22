import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const logoImage = require('../images/logo.png');

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>Welcome to Bawarchi</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    marginTop: 20,
    alignItems:"center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#FF6F61",
    borderRadius: 10,
    paddingVertical: 15,
    width: 200,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
});

export default HomeScreen;
