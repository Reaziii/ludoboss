import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

const Board = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{translateX: -200}, {translateY: -200}],
      }}>
      <ImageBackground
        source={require('../Assets/Image/board2.png')}
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          zIndex : 1,
        }}>
        <ImageBackground
          source={require('../Assets/Image/flagA2.png')}
          style={{
            height: 100,
            width: 100,
            marginTop: 15,
            marginLeft: 20,
            position: 'absolute',
          }}></ImageBackground>

        <ImageBackground
          source={require('../Assets/Image/flagA4.png')}
          style={{
            height: 100,
            width: 100,
            marginTop: 15,
            marginLeft: 280,
            position: 'absolute',
          }}></ImageBackground>

        <ImageBackground
          source={require('../Assets/Image/flagA1.png')}
          style={{
            height: 100,
            width: 100,
            marginTop: 285,
            marginLeft: 20,
            position: 'absolute',
          }}></ImageBackground>

        <ImageBackground
          source={require('../Assets/Image/flagA3.png')}
          style={{
            height: 100,
            width: 100,
            marginTop: 285,
            marginLeft: 280,
            position: 'absolute',
          }}></ImageBackground>
      </ImageBackground>

      <ImageBackground
        source={require('../Assets/Image/flagB4.png')}
        style={{
            height : 171,
            width : 80,
            position : 'absolute',
            marginTop : 27,
            marginLeft : 160,
            zIndex : 100,
        }}
      />
      <ImageBackground
        source={require('../Assets/Image/flagB2.png')}
        style={{
            height : 173,
            width : 80,
            position : 'absolute',
            marginTop : 112,
            marginLeft : 74,
            zIndex : 100,
            transform : [
                {rotate : '-90deg'}
            ]
        }}
      />
      <ImageBackground
        source={require('../Assets/Image/flagB3.png')}
        style={{
            height : 173,
            width : 80,
            position : 'absolute',
            marginTop : 113,
            marginLeft : 247,
            zIndex : 100,
            transform : [
                {rotate : '90deg'}
            ]
        }}
      />
      <ImageBackground
        source={require('../Assets/Image/flagB1.png')}
        style={{
            height : 173,
            width : 80,
            position : 'absolute',
            marginTop : 200,
            marginLeft : 161,
            zIndex : 100,
            transform : [
                {rotate : '180deg'}
            ]
        }}
      />
    </View>
  );
};

export default Board;
