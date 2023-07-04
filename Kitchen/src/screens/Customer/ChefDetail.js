import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ChefDetail = ({ route }) => {
  const { chef } = route.params;

  const openWhatsApp = (phoneNumber) => {
    const url = `https://wa.me/${phoneNumber}`; // WhatsApp URL with phone number
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("WhatsApp is not installed");
        }
      })
      .catch((error) => console.log("Error opening WhatsApp:", error));
  };

  const makePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("Phone calls are not available");
        }
      })
      .catch((error) => console.log("Error making phone call:", error));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: chef.image }} style={styles.chefImage} />
      <View style={styles.detailsContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Chef Name:</Text>
          <Text style={styles.label}>Expertise:</Text>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.label}>Email:</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{chef.fullName}</Text>
          <Text style={styles.text}>{chef.expertise}</Text>
          <Text style={styles.text}>+{chef.phoneNumber}</Text>
          <Text style={styles.text}>{chef.email}</Text>
        </View>
      </View>
      <View style={styles.contactIcons}>
        <TouchableOpacity
          onPress={() => makePhoneCall(chef.phoneNumber)}
          style={styles.phoneButton}
        >
          <Icon name="phone" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openWhatsApp(chef.phoneNumber)}
          style={styles.whatsappButton}
        >
          <Icon name="whatsapp" size={24} color="#25D366" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom:30
  },
  labelContainer: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#666",
  },
  contactIcons: {
    flexDirection: "row",
    marginBottom: 16,
  },
  phoneButton: {
    marginRight: 16,
  },
  whatsappButton: {},
  chefImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    padding: 60
  },
});

export default ChefDetail;
