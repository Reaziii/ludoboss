const firestore = require("firebase").firestore();
const ludoLogics = {
  checkStopich: (pos) => {
    if (
      pos === 0 ||
      pos === 9 ||
      pos === 13 ||
      pos === 22 ||
      pos === 26 ||
      pos === 35 ||
      pos === 39 ||
      pos === 48
    ) {
      return true;
    }
    return false;
  },
  nextPos: (color, from, dicevalue) => {
    if (color === 1) {
      if (from < 12 && from + dicevalue >= 12) {
        let x = 11 - from;
        dicevalue -= x;
        return 58 + dicevalue - 1;
      }
      if (from >= 58) return pos + now;
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
  },

  toPossible: (color, to) => {
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
  },

  diceThekeBlockCheck: (color, dicevalue, pos) => {
    let ret = pos;
    let round = new Array(200).fill(false);
    let found = false;
    for (let i = 0; i < 100; i++) {
      if (pos[i][color]) {
        let nxt = this.nextPos(color, i, dicevalue);
        if (this.toPossible(color, nxt)) {
          found = true;
          round[i] = true;
        }
      }
    }
    return {
      found,
      round,
    };
  },

  updateToNext: (color, gameid, person) => {
    let id = -1;
    for (let i = 0; i < person.length; i++) {
      if (color === person[i]) {
        id = i;
      }
    }
    id %= person.length;
    if (id === -1) return;
    firestore
      .collection("games")
      .doc(gameid)
      .update({
        sixcount: 0,
        chal: id,
        round: new Array(100).fill(false),
        iddice: true,
      });
  },

  goFromTo: async (color, gameid, from, to, pos) => {
    let ref = firestore.collection("games").doc(gameid);
    if (this.checkStopich(nxt)) {
      pos[from][color]--;
      pos[to][color]++;
      ref.update({
        pos: pos,
      });
      return;
    } else {
      pos[from][color] -= 1;
      pos[to][color] + 1;
      for (let i = 0; i < 4; i++) {
        if (i !== color && pos[to][i] === 1) {
          pos[to][i] = 0;
        }
      }
      await ref.update({
        pos: pos,
      });
    }
  },
};

module.exports = ludoLogics;
