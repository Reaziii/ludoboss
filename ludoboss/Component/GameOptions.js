import React from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useHistory} from 'react-router-native';

const GameOptions = () => {
  const prices = [100,1000,10000];
  const history = useHistory();
  const search_game = price => {
    if (!price) return;
    history.push(`/searchgame/${price}`);
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        maxHeight: 350,
      }}>
      <View
        style={{
          paddingBottom: 10,
          width: '100%',
          alignItems: 'center',
        }}>
        {prices.map((item, key) => (
          <TouchableOpacity
            onPress={() => search_game(item)}
            key={key}
            style={{
              height: 60,
              width: 250,
              backgroundColor: '#eac500',
              borderRadius: 8,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Image
              style={{height: 50, width: 50, marginLeft: 5}}
              source={require('../Assets/Icons/ludodice.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontFamily: 'Amaranth-Bold',
              }}>
              {item}
            </Text>
            <View
              style={{height: 50, width: 50, marginLeft: 5}}
              source={require('../Assets/Icons/ludodice.png')}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default GameOptions;
