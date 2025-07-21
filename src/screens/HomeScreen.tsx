import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import styles from '../styles/common';
import PlayButton from '../components/PlayButton';  
import RadioDial from '../components/RadioDial';
import setupTrackPlayer from '../services/setupTrackPlayer';
import { getNextTrack } from '../api/tracks';

const HomeScreen = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Setup TrackPlayer when the component mounts
    
    setupTrackPlayer();

    return () => {
      //TrackPlayer.destroy();
    };
  }, []);

  const togglePlayPause = async () => {
    try {
      if (!playing) {
        const data = await getNextTrack()
        // start = data.start;
        const queue = await TrackPlayer.getQueue();
        if (queue.length === 0) {
          await TrackPlayer.add({
            id: data.id,
            url: data.url,
            title: 'Mechanical Radio',
            artist: 'Georgi',
          });
        }
        // await TrackPlayer.seekTo(start);
        await TrackPlayer.play();
      } else {
        await TrackPlayer.reset();
      }
      setPlaying(prev => !prev);
    } catch (error) {
      // console.error("Error fetching audio URL:", audioUrl);
      // console.error("Error in togglePlayPause:", error);
      
    }
  };

  return (
    <View style={styles.homeContainer}>
        <Text style={styles.title}>Mechanical Radio</Text>
        <RadioDial playing={playing} />
        <PlayButton playing={playing} onPress={togglePlayPause}></PlayButton>
    </View>
  );
};

export default HomeScreen;