import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';

export const GoogleLogin = ({onPress, loding}) => {
  return (
    <Pressable
      onPress={loding?null:onPress}
      style={{
        height: 50,
        width: Dimensions.get('screen').width - 80,
        marginLeft: 40,
        position: 'relative',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height - 200,
        borderColor: '#cccccc',
        borderWidth: 1,
      }}>
      <Image
        style={{
          height: 30,
          width: 30,
          marginLeft: 10,
        }}
        source={require('../Assets/Icons/googleG.png')}
      />
      {loding ? (
        <ActivityIndicator color="red" />
      ) : (
        <Text
          style={{
            fontFamily: 'Amaranth-Bold',
            fontSize: 20,
            color: '#ff3300',
          }}>
          Sign in with Google
        </Text>
      )}

      <View style={{height: 40, width: 40}} />
    </Pressable>
  );
};
