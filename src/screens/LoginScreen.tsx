import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/common'; 
import useAuth from '../store/useAuth';
import { login, register } from '../api/auth'; // Assuming you have an API service for login

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(email, password); // <- see below
      useAuth.getState().login({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      });
    } catch (e) {
      console.error('login failed', e);
    }
  };

  const handleRegister = async () => {
    try {
      const resReg = await register(email, password); // <- see below
      if (resReg.error) {
        console.error('Registration failed', resReg.error);
        return;
      }
      const res = await login(email, password);
      useAuth.getState().login({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      });
    } catch (e) {
      console.error('login failed', e);
    }
  };


  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister} style={styles.buttonLogin}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default LoginScreen;