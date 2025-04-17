import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const App = (): React.JSX.Element => {
  const [playing, setPlaying] = useState<boolean>(false);

  const togglePlayPause = () => {
    setPlaying(prev => !prev);
  };

  return (
    <ImageBackground
      source={require('./assets/radio_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mechanical Radio</Text>
        <View style={styles.radioDial}>
          <Text style={styles.radioText}>
            {playing ? 'Playing...' : 'Paused'}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
          <Text style={styles.buttonText}>
            {playing ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#A97338', // main background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(63, 59, 51, 0.9)', // third color with opacity
    marginHorizontal: '10%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#DDB880', // secondary color for the title
    marginBottom: 20,
  },
  radioDial: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#f5f5f5',
    borderWidth: 5,
    borderColor: '#DDB880', // main color as accent for the dial border
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  radioText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#423D35', // secondary color for radio text
  },
  button: {
    backgroundColor: '#DDB880', // main color as the button background
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    fontSize: 20,
    color: '#423D35',
  },
});


export default App;