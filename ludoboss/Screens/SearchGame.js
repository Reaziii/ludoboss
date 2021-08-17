import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions, ImageBackground, BackHandler, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-native';
import {backendUrl} from '../Utils/server';
import firestore from '@react-native-firebase/firestore';
import { clear_all_modal } from '../Redux/modal/actions';
const SearchGame = () => {
  let {price} = useParams();
  const user = useSelector(s => s.user.user);
  const dispatch = useDispatch();
  const gameid = useSelector(state => state.game.gameid);
  const [person, setperson] = useState([]);
  const mypic = useSelector(state => state.user.photo);
  const [imgs, setimgs] = useState([]);
  let [names, setnames] = useState([]);
  const history = useHistory();
  const search_game = () => {
    if (gameid !== null) return;
    let data = {
      userid: user.uid,
      price: price,
    };
    axios.post(backendUrl + 'game/search', data).then(res => {
      if (res.data.success) {
        dispatch({
          type: 'NEW_GAMEID',
          payload: res.data.gameid,
        });
        firestore()
          .collection('games')
          .doc(res.data.gameid)
          .onSnapshot(ret => {
            if (ret.exists) {
              setperson([...ret.data().person]);
            }
          });
      }
    });
    // firestore().collection('games').doc('ffIiMwL17AXFiSajCElo').get().then(res=>{
    //     console.log(res.data())
    // })
  };
  console.log(person)

  useEffect(async () => {
    if (person.length === 4) {
      history.push('/playground');
      return;
    }
    let temp = [];
    let name = [];
    let data = {};
    for (let i = 0; i < person.length; i++) {
      if (person[i] === user.uid) {
        data[person[i]] = {
          name: user.displayName,
          url: user.photoURL,
        };
        continue;
      }
      let at = await getPhotoUrl(person[i]);
      temp.push(at.url);
      name.push(at.name);
      data[person[i]] = {
        name: at.name,
        url: at.url,
      };
    }
    dispatch({
      type: 'GAME_USER_DATA',
      payload: {...data},
    });
    setimgs([...temp]);
    setnames([...name]);
  }, [person]);

  const getPhotoUrl = async userid => {
    const ret = await axios.post(backendUrl + 'profile/timage', {userid});
    return {url: ret.data.content, name: ret.data.displayName};
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => history.push('/')}
      ]);
      return true;
    };
    const back = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => back.remove();
  }, []);
  useEffect(() => {
    search_game();
  }, []);
  useEffect(()=>{
    dispatch(clear_all_modal());
  },[])
  return (
    <ImageBackground
      source={require('../Assets/Image/bg4.png')}
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('window').width,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Amaranth-Bold',
          color: 'white',
          width: Dimensions.get('screen').width,
          textAlign: 'center',
          marginTop: 50,
        }}>
        Searching...
      </Text>
      <View
        style={{
          marginTop: 80,
          width: Dimensions.get('screen').width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {mypic ? (
          <Image
            style={{
              height: 70,
              width: 70,
              borderRadius: 70,
              borderColor: 'lightgreen',
              borderWidth: 2,
            }}
            source={{uri: mypic}}
          />
        ) : (
          <View style={{height: 70, width: 70}} />
        )}
        <Text
          style={{
            fontFamily: 'Amaranth-Bold',
            color: 'white',
            marginTop: 10,
            fontSize: 14,
          }}>
          {user.displayName}
        </Text>
      </View>

      <View
        style={{
          height: 100,
          width: Dimensions.get('screen').width,
          backgroundColor: 'white',
          marginTop: 80,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        {imgs.map((item, key) => (
          <View
            key={key}
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 60,
                borderWidth: 2,
                borderColor: 'lightgreen',
              }}
            />

            <Text
              style={{
                fontFamily: 'Amaranth-Bold',
                color: '#363636',
                marginTop: 10,
                fontSize: 12,
              }}>
              {names[key]}
            </Text>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

export default SearchGame;
