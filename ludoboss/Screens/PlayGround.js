import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import Board from '../Component/Board';
import Ground from '../Component/Ground';
import {backendUrl, rollDice} from '..//Utils/server';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import YellowDice from '../Component/YellowDice';
import BlueDice from '../Component/BlueDice';
import GreenDice from '../Component/GreenDice';
import RedDice from '../Component/RedDice';
import Boxes from '../Component/Boxes';
import GameEnd from '../Component/GameEnd';
import {useHistory} from 'react-router-native';
import {clear_all_modal} from '../Redux/modal/actions';
// import {  } from 'react-router';
const getPhotoUrl = async userid => {
  const ret = await axios.post(backendUrl + 'profile/timage', {userid});
  return {url: ret.data.content, name: ret.data.displayName, win: ret.data.win};
};

const update_datas = async (ranks, person) => {
  let retx = [];
  for (let i = 0; i < ranks.length; i++) {
    let item = ranks[i];
    let userid = person[item];
    let ret = await axios.post(backendUrl + 'profile/timage', {userid});
    retx.push({
      url: ret.data.content,
      name: ret.data.displayName,
      win: ret.data.win,
    });
  }

  return retx;
};

const PlayGround = () => {
  const gameid = useSelector(state => state.game.gameid);
  const game = useSelector(state => state.game.game);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const chal = useSelector(state => state.game.game.chal);
  const [gameover, setgameover] = useState(false);
  const history = useHistory();
  const [ranks, setranks] = useState([]);
  const [dataxx, setdataxx] = useState([]);
  const opendone = useSelector(state => state.game.opendone);
  const [price, setprice] = useState(0);
  console.log(price)
  useEffect(() => {
    if (gameid) {
      firestore()
        .collection('games')
        .doc(gameid)
        .onSnapshot(async res => {
          if (!res.exists) {
            history.push('/');
          }
          setprice(res.data().price*4);
          if (res.data().close) {
            setgameover(true);
            update_datas(res.data().ranks, res.data().person).then(ret => {
              setdataxx([...ret]);
            });
          }
          dispatch({
            type: 'UPDATE_GAME',
            payload: {...res.data()},
          });
        });
      setloading(false);
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const back = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => back.remove();
  }, []);
  useEffect(() => {
    dispatch(clear_all_modal());
  }, []);
  if (loading) {
    return <ActivityIndicator color="blue" />;
  }

  return (
    <ImageBackground
      source={require('../Assets/Image/bg7.jpeg')}
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'lightblue',
        position: 'relative',
      }}>
      <View
        style={{
          height: 540,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            {translateY: -(540 / 2)},
            {translateX: -200},
            {scale: 0.95},
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            width: '100%',
          }}>
          <YellowDice />
          <BlueDice />
        </View>
        <Ground />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            width: '100%',
            top: '100%',
            transform: [{translateY: -50}],
          }}>
          <GreenDice />
          <RedDice />
        </View>
      </View>
      <GameEnd price={price} data={dataxx} close={gameover} />
    </ImageBackground>
  );
};

export default PlayGround;
