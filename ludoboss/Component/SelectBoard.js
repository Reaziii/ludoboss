import React from 'react';
import {View, Text, ImageBackground} from 'react-native';



const SelectBoard = () => {
  return (
    <View
      style={{
        width: 400,
        height: 400,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{translateX: -200}, {translateY: -200}],
        borderWidth: 1,
        position: 'relative',
      }}>
      {/* {board.map((item, i) => (
        <ImageBackground
          source={require('../Assets/pawn/1.png')}
          style={{
            height: 30,
            width: 40,
            top: item.y,
            left: item.x,
            position: 'absolute',
            zIndex: 1000 + item.y,
            transform: [{rotate: '90deg'}, {scale: 0.9}],
          }}>
          <Text>{i}</Text>
        </ImageBackground>
      ))} */}
      {/* <ImageBackground
        source={require('../Assets/pawn/1.png')}
        style={{
          height: 30,
          width: 40,
          top: -8,
          left: 205,
          position: 'absolute',
          zIndex: 1000,
          transform: [{rotate: '90deg'}, {scale: 0.9}],
        }}></ImageBackground> */}
    </View>
  );
};

export default SelectBoard;
