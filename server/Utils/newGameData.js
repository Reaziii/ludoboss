const newGameData = {
  pos: new Array(200).fill({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  }),
  chal: 0,
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  dicevalue : 0,
  person: [],
  close: false,
  sixcount: 0,
  price : 0,
  waitting : true,
  ranks : [],
  isdice : false,
  round : new Array(200).fill(false),
};
module.exports = newGameData;
