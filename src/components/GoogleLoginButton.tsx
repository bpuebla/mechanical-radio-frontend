import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { authorize } from 'react-native-app-auth';
import useAuth from '../store/useAuth';
import { googleLogin } from '../api/auth';
import commonStyles from '../styles/common'; // Adjust the import path as needed

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '498087978027-vvnrle4b2hmg8lnf9b7rv2qo72i0uvhu.apps.googleusercontent.com', // Replace with your Google Client ID
  redirectUrl: 'com.yourapp://oauth', // Replace with your app's redirect URL
  scopes: ['openid', 'profile', 'email'],
  additionalParameters: {},
  customHeaders: {},
};

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Authorize with Google
      const result = await authorize(config);
      
      // Send the token to your backend
      const response = await googleLogin(result.accessToken);
      
      // Store the tokens from your backend
      useAuth.getState().login({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        // user: response.user,
      });
    } catch (error) {
      console.error('Google login failed', error);
      Alert.alert('Error', 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.googleButton, loading && commonStyles.buttonDisabled]}
      onPress={handleGoogleLogin}
      disabled={loading}
    >
      <Text style={styles.googleButtonText}>
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#4285f4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GoogleLoginButton;