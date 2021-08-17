import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {backendUrl} from '../Utils/server';
import All from './dices/All';

const DiceRoll = () => {
  let chal = useSelector(s => s.game.game.chal);
  let roll = useSelector(s => s.game.game.roll);
  let gameid = useSelector(s => s.game.gameid);
  const dispatch = useDispatch();
  let dicevalue = useSelector(s => s.game.game.dicevalue);

  const pressed = () => {
    dispatch({
      type: 'REVERSE_CLOSE',
    });
    const data = {
      chal: chal,
      gameid,
    };
    axios
      .post(backendUrl + 'game/diceroll', data)
      .then(res => {
        if (res.data.success) {
        } else {
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Pressable
      onPress={() => pressed()}
      style={{
        height: 35,
        width: 35,
        backgroundColor: 'white',
        borderRadius: 8,
      }}>
      {roll ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              height: 40,
              width: 40,
              overflow: 'hidden',
            }}>
            <Image
              source={require('../Assets/gif/ludoroll.gif')}
              style={{height: 40, width: 40, borderRadius: 10}}
            />
          </View>
        </View>
      ) : (
        <All id={dicevalue} />
      )}
    </Pressable>
  );
};

export default DiceRoll;
