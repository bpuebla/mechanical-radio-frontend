import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../styles/common';

type Props = {
  playing: boolean;
  onPress: () => void;
};

const PlayButton: React.FC<Props> = ({ playing, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {playing ? 'Pause' : 'Play'}
    </Text>
  </TouchableOpacity>
);

export default PlayButton;