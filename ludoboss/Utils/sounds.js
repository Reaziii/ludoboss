import Sound from 'react-native-sound';

export const playSound = () => {
  let whoosh = new Sound(
    require('../Assets/audio/menu_music.aac'),
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            whoosh.duration +
            'number of channels: ' +
            whoosh.numberOfChannels,
        );
      }
      whoosh.setNumberOfLoops(-1);
      whoosh.play(success => {
        console.log(success);
      });
    },
  );
};
