const firestore = require("firebase").firestore();
const checkStopich = (pos) => {
  if (
    pos === 0 ||
    pos === 8 ||
    pos === 13 ||
    pos === 21 ||
    pos === 26 ||
    pos === 34 ||
    pos === 39 ||
    pos === 47
  ) {
    return true;
  }
  return false;
};
const nextPos = (color, from, dicevalue) => {
  if (color === 1) {
    if (from < 12 && from + dicevalue >= 12) {
      let x = 11 - from;
      dicevalue -= x;
      return 58 + dicevalue - 1;
    }
    if (from >= 58) return from + dicevalue;
    return (from + dicevalue) % 52;
  }

  if (color === 0) {
    if (from < 51 && from + dicevalue >= 51) {
      let x = 50 - from;
      dicevalue -= x;
      return 52 + dicevalue - 1;
    }
    if (from >= 52) return from + dicevalue;

    return (from + dicevalue) % 52;
  }

  if (color === 2) {
    if (from < 25 && from + dicevalue >= 25) {
      let x = 24 - from;

      dicevalue -= x;

      return 64 + dicevalue - 1;
    }
    if (from >= 64) return from + dicevalue;

    return (from + dicevalue) % 52;
  }

  if (color === 3) {
    if (from < 38 && dicevalue + from >= 38) {
      let x = 37 - from;

      dicevalue -= x;

      return 70 + dicevalue - 1;
    }
    if (from >= 70) return dicevalue + from;

    return (from + dicevalue) % 52;
  }
};

const toPossible = (color, to) => {
  if (color === 0) {
    if (to >= 0 && to <= 50) return true;
    if (to >= 52 && to <= 57) return true;
    return false;
  }
  if (color === 1) {
    if (to >= 13 && to <= 51) return true;
    if (to >= 0 && to <= 11) return true;
    if (to >= 58 && to <= 63) return true;
    return false;
  }
  if (color === 2) {
    if (to >= 0 && to <= 51 && to !== 25) return true;
    if (to >= 64 && to <= 69) return true;
    return false;
  }
  if (color === 3) {
    if (to >= 0 && to <= 51 && to !== 38) return true;
    if (to >= 70 && to <= 75) return true;
    return false;
  }

  return false;
};
const diceThekeBlockCheck = (color, dicevalue, pos) => {
  let ret = pos;
  let round = new Array(100).fill(false);
  let found = false;
  for (let i = 0; i < 4; i++) {
    if (pos[i] === -1) continue;
    let nxt = nextPos(color, pos[i], dicevalue);
    if (toPossible(color, nxt)) {
      found = true;
      round[pos[i]] = true;
    }
  }
  return {
    found,
    round,
  };
};

const updateToNext = (color, gameid, person) => {
  let id = -1;
  for (let i = 0; i < person.length; i++) {
    if (color === Number(person[i])) {
      id = i;
    }
  }
  if (id === -1) return;
  ++id;
  id %= person.length;
  firestore
    .collection("games")
    .doc(gameid)
    .update({
      sixcount: 0,
      chal: person[id],
      round: new Array(100).fill(false),
      isdice: true,
      givechal: false,
    });
};

const goFromTo = async (color, gameid, from, to, bar, id, z, o, t, h) => {
  let ref = firestore.collection("games").doc(gameid);
  if (checkStopich(to)) {
    bar[id] = to;
    await ref.update({
      [color]: bar,
      isdice: true,
      givechal: false,
    });
    return null;
  } else {
    bar[id] = to;
    //zero
    let katse = null;
    if (color !== 0) {
      let cnt = 0;
      for (let i = 0; i < 4; i++) {
        if (to === z[i]) cnt++;
      }
      if (cnt === 1) {
        for (let i = 0; i < 4; i++) {
          if (to === z[i]) {
            z[i] = -1;
            katse = [0, i];
          }
        }
      }
    }

    if (color !== 1) {
      let cnt = 0;
      for (let i = 0; i < 4; i++) {
        if (to === o[i]) cnt++;
      }
      if (cnt === 1) {
        for (let i = 0; i < 4; i++) {
          if (to === o[i]) {
            o[i] = -1;
            katse = [1, i];
          }
        }
      }
    }

    if (color !== 2) {
      let cnt = 0;
      for (let i = 0; i < 4; i++) {
        if (to === t[i]) cnt++;
        if (cnt === 1) {
          for (let i = 0; i < 4; i++) {
            if (to === t[i]) {
              t[i] = -1;
              katse = [2, i];
            }
          }
        }
      }
    }

    if (color !== 3) {
      let cnt = 0;
      for (let i = 0; i < 4; i++) {
        if (to === h[i]) cnt++;
      }
      if (cnt === 1) {
        for (let i = 0; i < 4; i++) {
          if (to === h[i]) {
            h[i] = -1;
            katse = [3, i];
          }
        }
      }
    }
    let lastStop = [57, 63, 69, 75];
    let c = 0;
    for (let i = 0; i < 4; i++) {
      if (bar[i] === lastStop[color]) c++;
    }

    if (c < 4 && to === lastStop[color]) {
      await ref.update({
        0: z,
        2: t,
        3: h,
        1: o,
        [color]: bar,
        isdice: true,
        givechal: false,
      });
      return true;
    } else if (c === 4) {
      await ref.get().then(async (data) => {
        let persons = await data.data().persons;
        let ranks = await data.data().ranks;
        let temp = ranks;
        temp.push(color);
        let xxx = [];
        for (let i = 0; i < persons.length; i++) {
          if (color !== Number(persons[i])) {
            xxx.push(persons[i]);
          }
        }
        if (xxx.length === 1) {
          temp.push(xxx[0]);
        }
        await ref
          .update({
            persons: xxx,
            ranks: temp,
            0: z,
            2: t,
            3: h,
            1: o,
            [color]: bar,
            isdice: true,
            givechal: false,
            close: xxx.length === 1 ? true : false,
          })
          .then(() => {
            if (xxx.length === 1) {
              EndPos(gameid);
            }
          });
      });

      return null;
    } else {
      await ref.update({
        0: z,
        2: t,
        3: h,
        1: o,
        [color]: bar,
        isdice: true,
        givechal: false,
      });
      return katse;
    }
  }
};

const EndPos = (gameid) => {
  console.log('endpos',gameid)
  firestore
    .collection("games")
    .doc(gameid)
    .get()
    .then((res) => {
      const ranks = res.data().ranks;
      const person = res.data().person;
      let price = res.data().price * 4;
      let vag = [50, 34, 16, 0];
      let isroom = res.data().isroom;
      for (let i = 0; i < 3; i++) {
        let userid = person[ranks[i]];

        firestore
          .collection("users")
          .doc(userid)
          .get()
          .then((res) => {
            let old = res.data().coin;
            let onlineWin = res.data().onlineWin;
            let friendWin = res.data().friendWin;
            console.log(onlineWin,friendWin)
            if (i === 0) {
              if (isroom) friendWin += 1;
              else onlineWin += 1;
            }
            firestore
              .collection("users")
              .doc(userid)
              .update({
                onlineWin: onlineWin,
                friendWin: friendWin,
                coin: old + (price / 100) * vag[i],
              });
          });
      }
    });
};

module.exports = {
  goFromTo,
  updateToNext,
  diceThekeBlockCheck,
  checkStopich,
  nextPos,
  toPossible,
};
