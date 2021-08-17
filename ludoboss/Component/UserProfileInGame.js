import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {backendUrl} from '../Utils/server';

const UserProfileInGame = ({userid}) => {
  const [profilePic, setprofilePic] = useState(null);
  useEffect(async () => {
    await axios.post(backendUrl + 'profile/timage', {userid}).then(ret => {
      setprofilePic(ret.data.content);
    });
  }, [userid]);
  return (
    <View
      style={{
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: '#1AFE01',
        borderRadius: 40,
        overflow: 'hidden',
      }}>
      <Image
        style={{
          height: '100%',
          width: '100%',
        }}
        source={
          profilePic && profilePic.length
            ? {uri: profilePic}
            : require('../Assets/Icons/profilePic.png')
        }
      />
    </View>
  );
};

export default UserProfileInGame;
