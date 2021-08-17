import React from 'react';
import {View, Text} from 'react-native';

const One = () => {
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
          top: 15,
          left: 15,
        }}
      />
    </View>
  );
};

export default One;
