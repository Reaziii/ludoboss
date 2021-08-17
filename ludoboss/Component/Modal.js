import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Animated, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Modal = ({children, title = 'Title', open, setopen}) => {
  let tr = useRef(new Animated.Value(0)).current;
  let op = useRef(new Animated.Value(0)).current;
  const [scale, setscale] = useState(0);
  useEffect(() => {
    if (open) {
      Animated.spring(tr, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 10,
      }).start();
      Animated.timing(op, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start();
      setscale(1);
    } else {
      Animated.spring(tr, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 10,
      }).start();
      Animated.timing(op, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
      setTimeout(() => {
        setscale(0);
      }, 300);
    }
  }, [open]);
  return (
    <Animated.View
      style={{
        height: scale?Dimensions.get('window').height:0,
        width: scale?Dimensions.get('screen').width:0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: open ? '#0000003b' : 'transparent',
        zIndex: scale ? 10000000 : 0,
        opacity: op,
      }}>
      <Animated.View
        style={{
          width: Dimensions.get('screen').width - 80,
          borderRadius: 12,
          overflow: 'hidden',
          transform: [{scale: tr}],
          borderLeftColor: 'white',
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderRightColor: 'white',
          borderBottomColor: 'white',
          borderBottomWidth: 2,
        }}>
        <LinearGradient
          style={{borderRadius: 8}}
          colors={['#2193b0', '#6dd5ed']}>
          <View
            style={{
              height: 50,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 34,
                width: 34,
                marginRight: 10,
                marginTop: 8,
                opacity: 0.6,
              }}
            />
            <Text
              style={{
                fontFamily: 'Amaranth-Bold',
                fontSize: 26,
                color: 'white',
                lineHeight: 50,
              }}>
              {title}
            </Text>
            <Pressable onPress={setopen}>
              <Image
                style={{
                  height: 34,
                  width: 34,
                  marginRight: 10,
                  marginTop: 8,
                  opacity: 0.5,
                }}
                source={require('../Assets/Icons/cross.png')}
              />
            </Pressable>
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width - 100,
              backgroundColor: '#6B5B95',
              marginLeft: 8,
              marginBottom: 10,
              borderRadius: 8,
            }}>
            {children}
          </View>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

export default Modal;
