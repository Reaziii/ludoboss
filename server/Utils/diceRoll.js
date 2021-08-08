const diceRoll = () => {
  let ret = Math.ceil(Math.random() * 100);
  if (ret >= 80) return 6;
  else if (ret <= 20) return 1;
  ret = Math.ceil(Math.random() * 6);
  return ret;
};
module.exports = diceRoll;
