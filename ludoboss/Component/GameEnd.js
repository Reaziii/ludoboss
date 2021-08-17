import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Image, Pressable, Animated} from 'react-native';
import {Link, useHistory} from 'react-router-native';
import {backendUrl} from '../Utils/server';

const GameEnd = ({close, data, price}) => {
  let name = ['Reaz Ahammed', 'Chowdhury bari', 'hridoy', 'sabbir rahman'];
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (close) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [close]);

  if (!close || !data || data.length !== 4) {
    return <></>;
  }
  const history = useHistory();
  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: '#0000007a',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          height: 500,
          width: 350,
          backgroundColor: '#384081',
          borderRadius: 20,
          transform: [{scale: scale}],
        }}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: 30,
            fontSize: 18,
            fontFamily: 'Amaranth-Bold',
            color: 'white',
          }}>{`Congratulations!`}</Text>

        <View
          style={{
            backgroundColor: '#232C71',
            height: 70,
            width: 300,
            marginLeft: 25,
            borderRadius: 10,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#fff',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 20,
          }}>
          <Image
            source={require('../Assets/Icons/winner.png')}
            style={{
              height: 50,
              width: 50,
              marginLeft: 10,
            }}
          />
          <Image
            source={{uri: data[0].url}}
            style={{
              height: 45,
              width: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'white',
              marginLeft: 10,
            }}
          />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              {data[0].name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              coin win : {(price / 100) * 50}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#232C71',
            height: 70,
            width: 300,
            marginLeft: 25,
            borderRadius: 10,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#fff',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 20,
          }}>
          <Image
            source={require('../Assets/Icons/2nd.png')}
            style={{
              height: 50,
              width: 50,
              marginLeft: 10,
            }}
          />
          <Image
            source={{uri: data[1].url}}
            style={{
              height: 45,
              width: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'white',
              marginLeft: 10,
            }}
          />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              {data[1].name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              coin win : {(price / 100) * 34}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#232C71',
            height: 70,
            width: 300,
            marginLeft: 25,
            borderRadius: 10,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#fff',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 20,
          }}>
          <Text
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#FC6497',
              color: 'white',
              marginLeft: 10,
              borderRadius: 50,
              textAlign: 'center',
              lineHeight: 50,
              fontSize: 20,
              fontFamily: 'Amaranth-Bold',
            }}>
            3rd
          </Text>
          <Image
            source={{uri: data[2].url}}
            style={{
              height: 45,
              width: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'white',
              marginLeft: 10,
            }}
          />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              {data[2].name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              coin win : {(price / 100) * 16}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#232C71',
            height: 70,
            width: 300,
            marginLeft: 25,
            borderRadius: 10,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#fff',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 20,
          }}>
          <Text
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#ccc',
              color: 'white',
              marginLeft: 10,
              borderRadius: 50,
              textAlign: 'center',
              lineHeight: 50,
              fontSize: 20,
              fontFamily: 'Amaranth-Bold',
            }}>
            4th
          </Text>
          <Image
            source={{uri: data[3].url}}
            style={{
              height: 45,
              width: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'white',
              marginLeft: 10,
            }}
          />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              {data[3].name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Amaranth-Bold',
                color: 'white',
              }}>
              coin win : 0
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => history.push('/')}
          style={{
            width: 250,
            height: 50,
            backgroundColor: '#CD1B63',
            marginLeft: 50,
            borderRadius: 10,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            borderTopWidth: 3,
            borderColor: '#D9528C',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Amaranth-Bold',
              color: 'white',
            }}>
            Home
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default GameEnd;
