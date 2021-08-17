import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  TextInput,
  BackHandler,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-native';
import { clear_all_modal } from '../Redux/modal/actions';

const Profile = () => {
  const history = useHistory();
  const profilePic = useSelector(state => state.user.photo);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [userProfile, setuserProfile] = useState({
    coin: 0,
    email: null,
  });
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(res => {
        setuserProfile(res.data());
      });
  }, []);
  useEffect(() => {
    const backAction = () => {
      history.push('/')
      return true;
    };
    const back = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => back.remove();
  }, []);
  useEffect(() => {
    dispatch(clear_all_modal());
  }, []);
  return (
    <ImageBackground
      source={require('../Assets/Image/bg6.jpg')}
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
      }}>
      <View
        style={{
          height: 60,
          width: Dimensions.get('screen').width,
          backgroundColor: '#0074D9',
          borderColor: '#7FDBFF',
          borderBottomWidth: 2,
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => history.push('/')}>
          <Image
            style={{height: 40, width: 40, marginLeft: 15}}
            source={require('../Assets/Icons/back.png')}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Amaranth-Bold',
            color: 'white',
          }}>
          Profile
        </Text>
        <View style={{height: 40, width: 40}} />
      </View>

      <View
        style={{
          height: 150,
          width: Dimensions.get('screen').width - 40,
          marginLeft: 20,
          borderWidth: 2,
          marginTop: 40,
          flexDirection: 'row',
          backgroundColor: '#fffcc9',
          borderRadius: 10,
          borderColor: '#ffcd80',
        }}>
        <Image
          source={{uri: profilePic}}
          style={{
            height: 85,
            width: 85,
            borderRadius: 85,
            borderColor: 'lightgreen',
            borderWidth: 4,
            marginTop: 10,
            marginLeft: 10,
          }}
        />

        <View>
          <View
            style={{
              height: 35,
              width: 200,
              backgroundColor: '#722F37',
              marginTop: 10,
              marginLeft: 20,
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Amaranth-Bold',
                width: '100%',
                marginLeft: 20,
                lineHeight: 35,
              }}>
              {user.displayName}
            </Text>
          </View>
          <Text
            style={{
              color: '#722F37',
              fontFamily: 'Amaranth-Bold',
              marginLeft: 25,
              marginTop: 10,
            }}>
            {userProfile.email}
          </Text>
          <View
            style={{
              marginLeft: 20,
              marginTop: 10,
              flexDirection: 'row',
              height: 20,
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assets/Icons/star.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text
              style={{
                color: '#FF4136',
                marginLeft: 8,
                fontFamily: 'Amaranth-Bold',
              }}>
              {userProfile.coin}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 250,
          width: Dimensions.get('screen').width - 40,
          marginLeft: 20,
          borderWidth: 2,
          marginTop: 40,
          backgroundColor: '#fffcc9',
          borderRadius: 10,
          borderColor: '#ffcd80',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#722F37',
            fontFamily: 'Amaranth-Bold',
            width: '100%',
            textAlign: 'center',
            fontSize: 18,
            marginTop: 15,
          }}>
          Archives
        </Text>

        <View
          style={{
            width: '90%',
            height: 80,
            alignItems: 'center',
            backgroundColor: '#ffcd80',
            borderRadius: 6,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Amaranth-Bold',
                fontSize: 18,
                color: '#722F37',
              }}>
              0
            </Text>
            <Text
              style={{
                fontFamily: 'Amaranth-Regular',
                fontSize: 16,
                color: '#ff8a00',
              }}>
              total
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Amaranth-Bold',
                fontSize: 18,
                color: '#722F37',
              }}>
              0
            </Text>
            <Text
              style={{
                fontFamily: 'Amaranth-Regular',
                fontSize: 16,
                color: '#ff8a00',
              }}>
              Game win
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Amaranth-Bold',
                fontSize: 18,
                color: '#722F37',
              }}>
              0
            </Text>
            <Text
              style={{
                fontFamily: 'Amaranth-Regular',
                fontSize: 16,
                color: '#ff8a00',
              }}>
              Game lose
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '90%',
            height: 80,
            backgroundColor: '#ffcd80',
            borderRadius: 6,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
              borderBottomWidth: 1,
              borderColor: '#fffcc9',
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Amaranth-Regular',
                fontSize: 15,
                color: '#722F37',
              }}>
              online won
            </Text>
            <Text
              style={{
                marginRight: 10,
                fontFamily: 'Amaranth-Regular',
                fontSize: 15,
                color: '#722F37',
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Amaranth-Regular',
                fontSize: 15,
                color: '#722F37',
              }}>
              online won
            </Text>
            <Text
              style={{
                marginRight: 10,
                fontFamily: 'Amaranth-Regular',
                fontSize: 15,
                color: '#722F37',
              }}>
              0
            </Text>
          </View>

          {/* <View>
            <Text>online won</Text>
            <Text>0</Text>
          </View> */}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;
