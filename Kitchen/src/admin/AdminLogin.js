import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests([]);
  }, []);

  const handleLogin = () => {
    axios
      .post('http://localhost:3500/user/login', {
        email,
        password,
      })
      .then((response) => {
        // Handle successful login
        setLoggedIn(true);
        fetchPendingRequests();
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };

  const fetchPendingRequests = () => {
    axios
      .get('http://localhost:3500/pending')
      .then((response) => {
        // Set the pending requests in the state
        setRequests(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleApproveRequest = (userId) => {
    axios
      .put(`http://localhost:3500/user/${userId}/approve`)
      .then((response) => {
        // Remove the approved user from the requests list
        setRequests(requests.filter((request) => request._id !== userId));
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleRejectRequest = (userId) => {
    axios
      .put(`http://localhost:3500/user/${userId}/reject`)
      .then((response) => {
        // Remove the rejected user from the requests list
        setRequests(requests.filter((request) => request._id !== userId));
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  if (!loggedIn) {
    return (
      <View>
        <Text>Admin Login</Text>
        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View>
      <Text>Pending Requests</Text>
      {requests.map((request) => (
        <View key={request._id}>
          <Text>Name: {request.fullName}</Text>
          <Text>Email: {request.email}</Text>
          <Text>Role: {request.userType}</Text>
          <Button title="Approve" onPress={() => handleApproveRequest(request._id)} />
          <Button title="Reject" onPress={() => handleRejectRequest(request._id)} />
        </View>
      ))}
    </View>
  );
};

export default AdminPanel;
