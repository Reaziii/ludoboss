import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Button1, GoogleLogin} from '../Component/Buttons';
import {firebaseConfig} from '../Utils/firebase';
import {useDispatch} from 'react-redux';
import { clear_all_modal } from '../Redux/modal/actions';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig).then(res => {
  });
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig).then(res => {
  });
}

const Login = () => {
  const [loading, setloading] = useState(false);
  async function onGoogleButtonPress() {
    setloading(true);
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    return auth()
      .signInWithCredential(googleCredential)
      .then(ret => {
        if (!ret) {
          setloading(false);
        }
      })
      .catch(err => {
      });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clear_all_modal());
  }, []);
  return (
    <ImageBackground
      source={require('../Assets/Image/bg2.jpeg')}
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}>
      <GoogleLogin loding={loading} onPress={onGoogleButtonPress} />
    </ImageBackground>
  );
};
export default Login;
