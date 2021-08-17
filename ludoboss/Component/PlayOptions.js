import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {open_gameoptions} from '../Redux/modal/actions';

const PlayOptions = () => {
  const dispatch = useDispatch();
  return (
    <>
      <View
        style={{
          height: 300,
          zIndex: 100,
          width: Dimensions.get('screen').width - 80,
          marginLeft: 40,
          marginTop: (Dimensions.get('screen').height - 500) / 2,
        }}>
        <Pressable
          style={{
            height: 150,
            width: 150,
          }}
          onPress={() => dispatch(open_gameoptions())}>
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={require('../Assets/Image/playonline.png')}
          />
        </Pressable>
      </View>
    </>
  );
};

export default PlayOptions;
