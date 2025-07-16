import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import commonStyles from '../styles/common'; 
import useAuth from '../store/useAuth';
import { login, register } from '../api/auth'; // Assuming you have an API service for login
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password); // <- see below
      useAuth.getState().login({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      });
    } catch (e) {
      console.error('login failed', e);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
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
      console.error('registration failed', e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Login Screen</Text>
      
      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <TouchableOpacity 
          onPress={handleLogin} 
          style={[styles.buttonLogin, loading && commonStyles.buttonDisabled]}
          disabled={loading}
        >
          <Text style={commonStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleRegister} 
          style={[styles.buttonLogin, loading && commonStyles.buttonDisabled]}
          disabled={loading}
        >
          <Text style={commonStyles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <GoogleLoginButton />
    </View>
  );
};

const styles = StyleSheet.create({
    buttonLogin: {
    backgroundColor: '#DDB880',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  loginText: {
    fontSize: 24,
    color: '#DDB880',
    fontFamily: 'Doto-Bold',
    paddingBottom: 20
  },})


export default LoginScreen;