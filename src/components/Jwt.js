// App.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tatvagyan.in/',
});

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(''); // Only used in register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchMode = () => {
    setIsLogin(prev => !prev);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleRegister = async () => {
    try {
      const res = await API.post('/thinkzone/register', {
        name,
        email,
        password,
      });

      console.log('registerlogin--->', res);
      Alert.alert('Success', res.data.msg);
    } catch (err) {
      Alert.alert('Error', err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await API.post('/thinkzone/login', {
        email,
        password,
      });
      console.log('res---->', res);
      await AsyncStorage.setItem('token', res.data.token);
      Alert.alert('Success', `Welcome ${res.data.user.name}`);
    } catch (err) {
      Alert.alert('Error', err.response?.data?.msg || 'Login failed');
    }
  };

  const testJWT = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await API.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('JWT Verified', `Logged in as ${res.data.name}`);
    } catch (err) {
      Alert.alert('JWT Failed', err.response?.data?.msg || 'Token invalid');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchButton} onPress={switchMode}>
        <Text style={styles.link}>
          {isLogin ? 'New user? Register' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={testJWT}>
        <Text style={[styles.link, {marginTop: 20}]}>
          🔐 Test JWT Protected API
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  switchButton: {marginTop: 10},
  link: {color: '#007AFF', textAlign: 'center'},
});
