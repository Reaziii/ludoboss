import React from 'react';
import {View, Text} from 'react-native';
import Board from './Board';
import Boxes from './Boxes';
import Pawns from './Pawns';
import SelectBoard from './SelectBoard';

const Ground = () => {
  return (
    <View
      style={{
        width: 400,
        height: 400,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{translateX: -200}, {translateY: -200}],
        position: 'relative',
        

      }}>
      <Board />
      <Pawns />
      <Boxes/>
    </View>
  );
};

export default Ground;
