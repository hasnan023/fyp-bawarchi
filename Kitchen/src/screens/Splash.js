import React, { useEffect } from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.text}>BAWARCHI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6F61",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
    letterSpacing: 2,
  },
});

export default Splash;
