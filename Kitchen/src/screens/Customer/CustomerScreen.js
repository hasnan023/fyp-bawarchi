// CustomerScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CustomerScreen = ({ navigation }) => {
  const [kitchens, setKitchens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchKitchens();
  }, []);

  const navigateToKitchenDetail = (kitchenId) => {
    navigation.navigate('KitchenDetail', { kitchenId });
  };

  const fetchKitchens = async () => {
    try {
      const response = await axios.get('http://localhost:3500/kitchen');
      setKitchens(response.data);
    } catch (error) {
      console.log('Error fetching kitchens:', error);
    }
  };

  const filteredKitchens = kitchens.filter((kitchen) =>
    kitchen.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderKitchenCard = ({ item }) => (
    <View style={styles.kitchenCard}>
      <TouchableOpacity onPress={() => navigateToKitchenDetail(item._id)}>
        <Image source={{ uri: item.image }} style={styles.kitchenImage} />
        <Text style={styles.kitchenName}>{item.fullName}</Text>
        <Text style={styles.kitchenCuisine}>{item.expertise}</Text>
        <Text style={styles.kitchenAddress}>{item.address}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for kitchens"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredKitchens}
        keyExtractor={(item) => item._id}
        renderItem={renderKitchenCard}
        contentContainerStyle={styles.kitchenList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  kitchenList: {
    paddingBottom: 16,
  },
  kitchenCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  kitchenImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  kitchenCuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  kitchenAddress: {
    fontSize: 14,
    color: '#888',
  },
});

export default CustomerScreen;
