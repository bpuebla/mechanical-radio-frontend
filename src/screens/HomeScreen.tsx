import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import styles from '../styles/common';
import PlayButton from '../components/PlayButton';  
import RadioDial from '../components/RadioDial';
import setupTrackPlayer from '../services/setupTrackPlayer';


const audioUrl = "http://192.168.1.132:80/next_track?user_id=13"; // replace with your mp3 URL
let mp3Url: string;
let id: number;
let start: number;

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
        const response = await fetch(audioUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },});
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
        }
        console.warn("Fetching audio URL:", audioUrl);
        const data = await response.json();
        // console.error("Fetching audio URL:", await response);
        mp3Url = data.audio_url; // Extract the mp3 URL from the response
        id = data.id; // Extract the track ID from the response
        // start = data.start;
        const queue = await TrackPlayer.getQueue();
        if (queue.length === 0) {
          await TrackPlayer.add({
            id: id,
            url: mp3Url,
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