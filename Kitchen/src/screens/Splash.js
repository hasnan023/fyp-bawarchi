import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";

const Splash = ({ navigation }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("Home");
  //   },1000;
  // });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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


// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// const Splash = () => {
//   return (
//           <View style={styles.container}>
//             <View style={styles.header}>
//               <Text style={styles.headerText}>Delicious Food</Text>
//               <Text style={styles.subHeaderText}>Delivered to your doorstep</Text>
//             </View>
//             <View style={styles.imageContainer}>
//               <Image
//                 style={styles.image}
//                 source={require('../images/logo.png')}
//                 resizeMode="cover"
//               />
//             </View>
//             <TouchableOpacity style={styles.footerButton}>
//               <Text style={styles.footerButtonText}>Start Ordering</Text>
//             </TouchableOpacity>
//           </View>
//         );
//       };
      
//       const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: '#f9f9f9',
//         },
//         header: {
//           marginBottom: 32,
//           alignItems: 'center',
//         },
//         headerText: {
//           fontSize: 36,
//           fontWeight: 'bold',
//           color: '#333',
//         },
//         subHeaderText: {
//           fontSize: 18,
//           color: '#888',
//           marginTop: 8,
//         },
//         imageContainer: {
//           flex: 1,
//           width: '100%',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         image: {
//           width: '80%',
//           height: '80%',
//           borderRadius: 16,
//         },
//         footerButton: {
//           backgroundColor: '#e74c3c',
//           paddingHorizontal: 20,
//           paddingVertical: 12,
//           borderRadius: 24,
//           shadowColor: '#000',
//           shadowOpacity: 0.4,
//           shadowRadius: 4,
//           elevation: 4,
//         },
//         footerButtonText: {
//           color: '#fff',
//           fontSize: 20,
//           fontWeight: 'bold',
//           textTransform: 'uppercase',
//         },
//       });

// export default Splash;  