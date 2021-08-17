import React from 'react';
import {View, Text} from 'react-native';

const Three = () => {
  return (
    <View
      style={{
        height: 36,
        width: 36,
        backgroundColor: 'white',
        borderRadius: 6,
        position: 'relative',
      }}>
      <View
        style={{
          position: 'absolute',
          height: 6,
          width: 6,
          borderRadius: 5,
          backgroundColor: 'black',
          top: 8,
          left: 8,
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: 6,
          width: 6,
          borderRadius: 5,
          backgroundColor: 'black',
          top: 15,
          left: 15,
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: 6,
          width: 6,
          borderRadius: 5,
          backgroundColor: 'black',
          top: 22,
          left: 22,
        }}
      />
    </View>
  );
};

export default Three;
