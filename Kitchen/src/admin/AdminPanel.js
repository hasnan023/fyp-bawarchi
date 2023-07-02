import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);
  const [approvedUser, setApprovedUser] = useState([]);

  useEffect(() => {
    setRequests([]);
    setApprovedUser([]);
  }, []);

  const handleLogin = () => {
    axios
      .post('http://192.168.100.53:3500/user/login', {
        email,
        password,
      })
      .then((response) => {
        // Handle successful login
        setLoggedIn(true);
        fetchPendingRequests();
        fetchApprovedRequests();
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };

  const fetchPendingRequests = () => {
    axios
      .get('http://192.168.100.53:3500/pending')
      .then((response) => {
        // Set the pending requests in the state
        setRequests(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const fetchApprovedRequests = () => {
    axios
      .get('http://192.168.100.53:3500/approved')
      .then((response) => {
        // Set the pending requests in the state
        setApprovedUser(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleApproveRequest = (request) => {
    axios
      .put(`http://192.168.100.53:3500/user/${request._id}/approve`)
      .then((response) => {
        // Remove the approved user from the requests list
        setRequests(requests.filter((req) => req._id !== request._id));
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

      axios
      .post(`http://192.168.100.53:3500/user/approveRequest`, request)
      .then((res) => {
        console.log(res.data);
        fetchApprovedRequests();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleRejectRequest = (userId) => {
    axios
      .put(`http://192.168.100.53:3500/user/${userId}/reject`)
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
      <View style={styles.container}>
        <Text style={styles.title}>Admin Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Requests</Text>
      {requests.map((request) => (
        <View key={request._id} style={styles.row}>
          <View style={styles.requestDetails}>
            <Text style={styles.text}>Name: {request.fullName}</Text>
            <Text style={styles.text}>Email: {request.email}</Text>
            <Text style={styles.text}>Role: {request.userType}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Approve"
              onPress={() => handleApproveRequest(request)}
              color="green"
            />
            <Button
              title="Reject"
              onPress={() => handleRejectRequest(request._id)}
              color="red"
            />
          </View>
        </View>
      ))}
      <Text style={styles.title}>Approved Users</Text>
      {approvedUser.map((approvedUser) => (
        <View style={styles.row}>
          <View style={styles.requestDetails}>
            <Text style={styles.text}>Name: {approvedUser.fullName}</Text>
            <Text style={styles.text}>Email: {approvedUser.email}</Text>
            <Text style={styles.text}>Role: {approvedUser.userType}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  requestDetails: {
    flex: 1,
    marginRight: 8,
  },
  text: {
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default AdminPanel;
