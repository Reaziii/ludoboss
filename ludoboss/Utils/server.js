import axios from 'axios';

export const backendUrl = 'https://sleepy-bastion-37437.herokuapp.com/';

export const rollDice = async (gameid, chal) => {
  console.log('wait');
  const data = {
    gameid,
    chal,
  };
  const ret = await axios.post(backendUrl + 'game/diceroll', data);
  return ret;
};
