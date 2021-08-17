import React from 'react';
import {View, Text} from 'react-native';
import BottomBos from './BottomBos';
import LeftBos from './LeftBos';
import RightBos from './RightBos';
import UpBos from './UpBos';

const Boxes = () => {
  return (
    <View
      style={{
        width: 400,
        height: 400,
        position: 'absolute',
      }}>
        <UpBos/>
        <LeftBos/>
        <BottomBos/>
        <RightBos/>
      </View>
  );
};

export default Boxes;
