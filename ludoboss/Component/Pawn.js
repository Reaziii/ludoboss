import React, {useEffect, useRef, useState} from 'react';
import {Alert, Animated, ImageBackground, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {board, box, stops} from '../Utils/board';
import {
  changeToMini,
  changeToMiniBoardLeft,
  changeToMiniBoardUp,
  fromTo,
  InPosTotal,
  reverse,
} from '../Utils/logics';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {backendUrl} from '../Utils/server';
import {uthabeLocal} from '../Utils/ExLogic';
const Pawn = ({id, color}) => {
  const xx = useRef(new Animated.Value(box[color][id].x)).current;
  const yy = useRef(new Animated.Value(box[color][id].y)).current;
  const ss = useRef(new Animated.Value(box[color][id].s)).current;
  const pos = useSelector(state => state.game);
  const mypos = useSelector(state => state.game.game[color][id]);
  const bar = useSelector(state => state.game[color]);
  const mypref = useSelector(state => state.game[color][id]); // my pos in redux
  const gameid = useSelector(state => state.game.gameid);
  const postotal = useSelector(state => state.game.postotal);
  const katatime = useSelector(state => state.game.katatime);
  const opendone = useSelector(state => state.reverse.reversestart);
  const game = useSelector(s => s.game.game);
  const [chal, setchal] = useState(0);
  const dispatch = useDispatch();
  const katagese = useSelector(s => s.game.katagese);
  useEffect(() => {
    // fromTo(Animated, -1, mypref, xx, yy, ss,color,id);
  }, []);
  useEffect(() => {
    if (mypos === mypref) return;
    if (mypos !== -1) {
      fromTo(
        Animated,
        mypref,
        mypos,
        xx,
        yy,
        ss,
        color,
        id,
        dispatch,
        bar,
        mypref,
        mypos,
        useSelector,
      ).then(time => {});
    } else {
      let bb = bar;
      bb[id] = mypos;
      dispatch({
        type: 'KATA_GESE',
        payload: {
          color: color,
          id: id,
          from: mypref,
          bar: bb,
        },
      });
    }
  }, [mypos]);

  useEffect(() => {
    if (katagese === null || opendone === false) return;
    if (katagese.color !== color || katagese.id !== id) return;

    if (opendone === true) {
      reverse(Animated, katagese.from, katagese.color, katagese.id, xx, yy, ss);
      dispatch({
        type: 'REMOVE_TOTAL_POS',
        payload: katagese.from,
      });
      setTimeout(() => {
        dispatch({
          type: 'UPDATE_OOP' + color,
          payload: [...katagese.bar],
        });
        dispatch({
          type: 'REMOVE_KATA_GESE',
        });
        dispatch({
          type: 'REVERSE_CLOSE',
        });
      }, 100);
    }
  }, [pos,opendone]);

  useEffect(() => {
    firestore()
      .collection('games')
      .doc(gameid)
      .onSnapshot(res => {
        setchal(res.data().chal);
      });
  }, []);
  const changeKorbe = async () => {
    if (mypos === -1) {
      //box theke uthabe

      uthabeLocal(chal, gameid, id, game, dispatch);

      const data = {
        chal: color,
        gameid,
        id: id,
        from: mypref,
      };
      await axios.post(backendUrl + 'game/uthabe', data).then(res => {});
    }
  };

  useEffect(() => {
    updatePostal(dispatch, pos);
  }, [mypref]);
  useEffect(() => {
    if (mypref === -1) return;
    if (postotal[mypref] > 1) {
      let left = InPosTotal(pos, mypref, color, id).get;
      if (mypref === 57 || mypref === 69) {
        changeToMiniBoardLeft(Animated, xx, yy, ss, mypref, left);
      } else if (mypref === 63 || mypref === 75) {
        changeToMiniBoardUp(Animated, xx, yy, ss, mypref, left);
      } else changeToMini(Animated, xx, yy, ss, mypref, left);
    } else {
      Animated.timing(ss, {
        toValue: board[mypref].s,
        duration: 50,
        useNativeDriver: false,
      }).start();
      Animated.timing(xx, {
        toValue: board[mypref].x,
        duration: 50,
        useNativeDriver: false,
      }).start();
      Animated.timing(yy, {
        toValue: board[mypref].y,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }
  }, [postotal]);
  return (
    <Animated.View
      style={{
        height: 30,
        width: 40,
        top: yy,
        left: xx,
        position: 'absolute',
        transform: [{rotate: '90deg'}, {scale: ss}],
        zIndex: mypref === -1 ? 10 : board[mypref].y * 10,
      }}>
      <ImageBackground
        source={
          color === 0
            ? require('../Assets/pawn/1.png')
            : color === 1
            ? require('../Assets/pawn/2.png')
            : color === 3
            ? require('../Assets/pawn/3.png')
            : require('../Assets/pawn/4.png')
        }
        style={{height: '100%', width: '100%'}}>
        <Pressable
          onPress={changeKorbe}
          style={{
            height: 30,
            width: 40,
          }}
        />
      </ImageBackground>
    </Animated.View>
  );
};

export default Pawn;

// fromTo(Animated, 0, 40, xx, yy, ss).then(res => {
//   dispatch({
//     type: 'KATA_TIME',
//     payload: res,
//   });
// });

const updatePostal = (dispatch, pos) => {
  let payload = new Array(100).fill(0);
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        if (pos[j][k] === i) {
          payload[i]++;
        }
      }
    }
  }
  dispatch({
    type: 'UPDATE_POST',
    payload,
  });
};
