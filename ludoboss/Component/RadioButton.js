import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable, Animated} from 'react-native';

const RadioButton = ({open, setopen}) => {
  const marginLeft = useRef(new Animated.Value(5)).current;
  useEffect(() => {
    if (open) {
      Animated.timing(marginLeft, {
        toValue: 25,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    if (!open) {
      Animated.timing(marginLeft, {
        toValue: 5,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [open]);
  return (
    <Pressable
      onPress={() => setopen(!open)}
      style={{
        height: 30,
        width: 50,
        // backgroundColor: '#ccc',
        backgroundColor: open ? 'lightgreen' : '#ccc',

        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
      }}>
      <Animated.View
        style={{
          height: 20,
          width: 20,
          marginLeft: 5,
          marginTop: 4,
          borderRadius: 20,
          backgroundColor: 'white',
          marginLeft: marginLeft,
        }}
      />
    </Pressable>
  );
};

export default RadioButton;
