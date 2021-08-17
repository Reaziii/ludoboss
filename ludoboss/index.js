/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NativeRouter} from 'react-router-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './Redux/rootReducer';
import firebase from '@react-native-firebase/app';
import {firebaseConfig} from './Utils/firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Index = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '886359263436-mopj3dslj0efo6ri5ofgc61tqi9ga3p1.apps.googleusercontent.com',
    });
  }, []);


  return (
    <NativeRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeRouter>
  );
};
AppRegistry.registerComponent(appName, () => Index);
