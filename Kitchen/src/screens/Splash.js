// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";

// const Splash = ({ navigation }) => {
//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     navigation.navigate("Home");
//   //   },1000;
//   // });
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Text style={styles.text}>BAWARCHI</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FF6F61",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "white",
//     textTransform: "capitalize",
//     letterSpacing: 2,
//   },
// });

// export default Splash;


import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Delicious Food</Text>
        <Text style={styles.subHeaderText}>Delivered to your doorstep</Text>
      </View>
      <Image
        style={styles.image}
        source={require('../images/logo.png')}
        resizeMode="cover"
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Start Ordering</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Splash;
