import axios from 'axios';

export const backendUrl = 'http://192.168.1.4:8080/';

export const rollDice = async (gameid, chal) => {
  console.log('wait');
  const data = {
    gameid,
    chal,
  };
  const ret = await axios.post(backendUrl + 'game/diceroll', data);
  return ret;
};
