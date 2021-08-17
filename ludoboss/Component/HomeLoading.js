import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const HomeLoading = () => {
  return (
    <Image
      source={require('../Assets/Image/bg5.jpeg')}
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
      }}
    />
  );
};

export default HomeLoading;
