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


// // import React from 'react';
// // import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// // const Splash = () => {
// //   return (
// //           <View style={styles.container}>
// //             <View style={styles.header}>
// //               <Text style={styles.headerText}>Delicious Food</Text>
// //               <Text style={styles.subHeaderText}>Delivered to your doorstep</Text>
// //             </View>
// //             <View style={styles.imageContainer}>
// //               <Image
// //                 style={styles.image}
// //                 source={require('../images/logo.png')}
// //                 resizeMode="cover"
// //               />
// //             </View>
// //             <TouchableOpacity style={styles.footerButton}>
// //               <Text style={styles.footerButtonText}>Start Ordering</Text>
// //             </TouchableOpacity>
// //           </View>
// //         );
// //       };
      
// //       const styles = StyleSheet.create({
// //         container: {
// //           flex: 1,
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           backgroundColor: '#f9f9f9',
// //         },
// //         header: {
// //           marginBottom: 32,
// //           alignItems: 'center',
// //         },
// //         headerText: {
// //           fontSize: 36,
// //           fontWeight: 'bold',
// //           color: '#333',
// //         },
// //         subHeaderText: {
// //           fontSize: 18,
// //           color: '#888',
// //           marginTop: 8,
// //         },
// //         imageContainer: {
// //           flex: 1,
// //           width: '100%',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //         },
// //         image: {
// //           width: '80%',
// //           height: '80%',
// //           borderRadius: 16,
// //         },
// //         footerButton: {
// //           backgroundColor: '#e74c3c',
// //           paddingHorizontal: 20,
// //           paddingVertical: 12,
// //           borderRadius: 24,
// //           shadowColor: '#000',
// //           shadowOpacity: 0.4,
// //           shadowRadius: 4,
// //           elevation: 4,
// //         },
// //         footerButtonText: {
// //           color: '#fff',
// //           fontSize: 20,
// //           fontWeight: 'bold',
// //           textTransform: 'uppercase',
// //         },
// //       });

// // export default Splash;  

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Splash = ({ navigation }) => {
  // useEffect(() => {
  //   // Simulating a delay to showcase the splash page
  //   const timeout = setTimeout(() => {
  //     // Navigate to the next screen after the delay
  //     navigation.navigate('Home'); // Replace 'Home' with your desired screen name
  //   }, 3000); // Replace 3000 with the desired delay in milliseconds

  //   // Clear the timeout if the component is unmounted
  //   return () => clearTimeout(timeout);
  // }, []);

  const handleGetStarted = () => {
    navigation.navigate('Home'); // Replace 'Home' with your desired screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Bawarchi</Text>
      <Image source={require('../../assets/hi.png')} style={styles.image} />
      <Text style={styles.slogan}>Delicious Food at Your Doorstep</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Replace with your desired background color
    paddingHorizontal: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000', // Replace with your desired text color
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 10,
  },
  slogan: {
    fontSize: 18,
    color: '#000000', // Replace with your desired text color
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#09605e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // Replace with your desired text color
  },
});

export default Splash;
