import TrackPlayer, { Capability } from 'react-native-track-player';

const setupTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious
        ]})
    };

export default setupTrackPlayer;