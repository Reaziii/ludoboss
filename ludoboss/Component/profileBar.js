import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-native';
import {open_settings} from '../Redux/modal/actions';
const ProfileNav = () => {
  const profilePic = useSelector(state => state.user.photo);
  const dispatch = useDispatch();
  const userdata = useSelector(state=>state.user.data);
  const history = useHistory();
  return (
    <View style={{zIndex: 1000}}>
      <View
        style={{
          height: 50,
          width: Dimensions.get('screen').width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
        }}>
        <View
          style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
          <Pressable onPress={() => history.push('/profile')}>
            <Image
              onError={e => console.log(e)}
              style={{
                height: 40,
                width: 40,
                zIndex: 1,
                borderRadius: 40,
                borderColor: 'lightgreen',
                borderWidth: 2,
                marginLeft: 5,
              }}
              source={
                profilePic && profilePic.length
                  ? {uri: profilePic}
                  : require('../Assets/Icons/profilePic.png')
              }
            />
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              height: 27,
              width: 120,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
              marginLeft: 10,
              borderRadius: 25,
              borderColor: 'white',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <Image
              style={{height: 20, width: 20}}
              source={require('../Assets/Icons/star.png')}
            />
            <Text
              style={{
                color: 'white',
                fontFamily: 'Amaranath-Bold',
                fontWeight: 'bold',
              }}>
              {userdata.coin}
            </Text>
            <Image
              style={{height: 15, width: 15}}
              source={require('../Assets/Icons/plus.png')}
            />
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable>
            <Image
              style={{height: 40, width: 40, marginRight: 15, marginTop: 0}}
              source={require('../Assets/Icons/rankings2.png')}
            />
          </Pressable>
          <Pressable
            style={{height: 30, width: 30, marginRight: 10, marginTop: 5}}
            onPress={() => dispatch(open_settings())}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../Assets/Icons/settings.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileNav;
