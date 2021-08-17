import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {boardxx} from '../Utils/boardTemp';
import {ChalDibe} from '../Utils/ChalDibe';
import {chaldibe} from '../Utils/ExLogic';

const RightBos = () => {
  let chal = useSelector(s => s.game.game.chal);
  let game = useSelector(s => s.game);
  let games = useSelector(s => s.game.game);
  let bar = game[chal];
  const dispatch = useDispatch();
  const board = boardxx();
  const pressed = async (y, x) => {
    let pressedOn = board[1][y][x];
    let bar = game[chal];
    for (let i = 0; i < 4; i++) {
      if (bar[i] === pressedOn) {
        let ab = await chaldibe(chal, game.gameid, i, games, dispatch);
        if(ab!==true) continue
        ChalDibe(pressedOn, chal, game.gameid, i).then(res => {
          console.log(res);
        });
        break;
      }
    }
  };
  return (
    <View
      style={{
        height: 80,
        width: 160,
        position: 'absolute',
        top : 160,
        opacity : 0.4,
      }}>
      {[0, 1, 2].map(x => (
        <View style={{flexDirection: 'row'}}>
          {[0, 1, 2,3,4,5].map(y => (
            <Pressable
                onPress={()=>pressed(x,y)}
              style={{
                height: 26.66,
                width: 26.66,
              }}></Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default RightBos;
