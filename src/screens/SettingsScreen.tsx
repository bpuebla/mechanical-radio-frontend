import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/common';
import { Picker } from '@react-native-picker/picker';


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

export default SettingsScreen;