import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/common'; 

const LoginScreen = () => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Login Screen</Text>
    </View>
  );
}

export default LoginScreen;