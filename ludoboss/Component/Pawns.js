import React, {useEffect, useRef} from 'react';
import {View, Text, ImageBackground, Animated, Pressable} from 'react-native';
import {board} from '../Utils/board';
import Pawn from './Pawn';
const Pawns = () => {

  return (
    <Animated.View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{translateX: -200}, {translateY: -200}],
        position: 'relative',
      }}>
      <Pawn color={0} id={0}/>
      <Pawn color={0} id={1}/>
      <Pawn color={0} id={2}/>
      <Pawn color={0} id={3}/>

      <Pawn color={1} id={0}/>
      <Pawn color={1} id={1}/>
      <Pawn color={1} id={2}/>
      <Pawn color={1} id={3}/>

      <Pawn color={2} id={0}/>
      <Pawn color={2} id={1}/>
      <Pawn color={2} id={2}/>
      <Pawn color={2} id={3}/>

      <Pawn color={3} id={0}/>
      <Pawn color={3} id={1}/>
      <Pawn color={3} id={2}/>
      <Pawn color={3} id={3}/>

      {/* <Pawn id={2}/> */}

    </Animated.View>
  );
};

export default Pawns;
