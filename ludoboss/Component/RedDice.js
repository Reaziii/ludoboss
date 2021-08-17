import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import UserProfileInGame from './UserProfileInGame';
import DiceRoll from './DiceRoll';
const RedDice = ({gameuserdata}) => {
  const game = useSelector(state => state.game.game);
  return (
    <View
      style={{
        flexDirection: 'row',
        width: 95,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {game.chal === 2 ? (
        <View>
          <DiceRoll />
        </View>
      ) : (
        <View style={{height: 35, width: 35}} />
      )}
      <UserProfileInGame userid={game.person[2]} />
    </View>
  );
};

export default RedDice;
