import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/common';


type Props = {
  playing: boolean;
};

const RadioDial: React.FC<Props> = ({ playing }) => (
  <View style={styles.radioDial}>
          <Text style={styles.radioText}>
            {playing ? 'Playing...' : 'Paused'}
          </Text>
</View>
);

export default RadioDial;