import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';

const mp3Url = "https://your-url-to-file.mp3"; // replace with your mp3 URL

const HomeScreen = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Setup TrackPlayer when the component mounts
    const setupTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };
    setupTrackPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const togglePlayPause = async () => {
    if (!playing) {
      const queue = await TrackPlayer.getQueue();
      if (queue.length === 0) {
        await TrackPlayer.add({
          id: 'track-001',
          url: mp3Url,
          title: 'Mechanical Radio Track',
          artist: 'Radio',
        });
      }
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    setPlaying(prev => !prev);
  };

  return (
    <View style={styles.homeContainer}>
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
  );
};

const SettingsScreen = () => {
  const [topic, setTopic] = useState("Music");

  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.title}>Select Radio Topic</Text>
      <Picker
        selectedValue={topic}
        style={styles.picker}
        onValueChange={(itemValue) => setTopic(itemValue)}
      >
        <Picker.Item label="Music" value="Music" />
        <Picker.Item label="Talk" value="Talk" />
        <Picker.Item label="News" value="News" />
        <Picker.Item label="Sports" value="Sports" />
      </Picker>
      <Text style={styles.selectedTopic}>Selected: {topic}</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#DDB880',
        tabBarInactiveTintColor: '#423D35',
        tabBarStyle: { backgroundColor: '#3F3B33' }
      }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#DDB880',
    marginBottom: 20,
    fontFamily: 'Doto-Bold'
  },
  radioDial: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#f5f5f5',
    borderWidth: 5,
    borderColor: '#DDB880',
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
    color: '#423D35',
    fontFamily: 'Doto-Bold'
  },
  button: {
    backgroundColor: '#DDB880',
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
    fontFamily: 'Doto-Bold'
  },
  picker: {
    height: 50,
    width: 200,
    color: '#DDB880',
    backgroundColor: '#3F3B33',
  },
  selectedTopic: {
    marginTop: 20,
    fontSize: 18,
    color: '#DDB880',
  },
});

export default App;