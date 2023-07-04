import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const logoImage = require('../images/logo.png');

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.upperText}>Welcome to Bawarchi</Text>
      </View>
      <View style={styles.lowerContainer}>
        <Image source={logoImage} style={styles.logo} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
  },
  upperContainer: {
    flex: 1,
    backgroundColor: "#09605e",
    alignItems: "center",
    justifyContent: "center",
  },
  upperText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  lowerContainer: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#09605e",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 16,
    width: 200,
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
