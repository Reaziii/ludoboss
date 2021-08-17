import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {boardxx} from '../Utils/boardTemp';
import {ChalDibe} from '../Utils/ChalDibe';
import {chaldibe} from '../Utils/ExLogic';
const BottomBos = () => {
  let chal = useSelector(s => s.game.game.chal);
  let game = useSelector(s => s.game);
  let games = useSelector(s => s.game.game);
  let bar = game[chal];
  const dispatch = useDispatch();
  const board = boardxx();
  const pressed = async (y, x) => {
    let pressedOn = board[4][x][y];
    let bar = game[chal];
    for (let i = 0; i < 4; i++) {
      if (bar[i] === pressedOn) {
        let ab = await chaldibe(chal, game.gameid, i, games, dispatch);
        if(ab!==true) continue
        ChalDibe(pressedOn, chal, game.gameid, i).then(res => {
        });
        break;
      }
    }
  };
  return (
    <View
      style={{
        height: 160,
        width: 80,
        position: 'absolute',
        left: 160,
        top: 240,
      }}>
      {[0, 1, 2, 3, 4, 5].map(x => (
        <View style={{flexDirection: 'row'}}>
          {[0, 1, 2].map(y => (
            <Pressable
              onPress={() => pressed(x, y)}
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

export default BottomBos;
