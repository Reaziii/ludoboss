import React, {useState} from 'react';
import {View, Text, Pressable, Image, ImageBackground} from 'react-native';
import RadioButton from './RadioButton';
import auth from '@react-native-firebase/auth';
const Settings = () => {
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [open3, setopen3] = useState(false);

  return (
    <View
      style={{
        paddingBottom: 20,
        paddingTop: 30,
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <View
          style={{
            width: 52,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Amaranth-Bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            sound
          </Text>
          <RadioButton open={open1} setopen={setopen1} />
        </View>
        <View
          style={{
            width: 52,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Amaranth-Bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            music
          </Text>
          <RadioButton open={open2} setopen={setopen2} />
        </View>
        <View
          style={{
            width: 60,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Amaranth-Bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Vibration
          </Text>
          <RadioButton open={open3} setopen={setopen3} />
        </View>
      </View>

      <Pressable
        onPress={() => auth().signOut()}
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          width: 280,
          height: 36,
          marginTop: 20,
        }}>
        <ImageBackground
          style={{width: 280, borderRadius: 8, height: 35}}
          source={require('../Assets/buttons/bluebutton.png')}>
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 30,
              color: 'white',
              fontSize: 18,
              fontFamily: 'Amaranth-Bold',
            }}>
            Logout
          </Text>
        </ImageBackground>
      </Pressable>

      <Text
        style={{
          color: '#262626',
          marginTop: 10,
        }}>
        Privacy and policy
      </Text>
    </View>
  );
};

export default Settings;
