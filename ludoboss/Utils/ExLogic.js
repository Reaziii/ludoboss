export const uthabeLocal = (chal, gameid, id, game, dispatch) => {
  if (chal === undefined || gameid === undefined || id === undefined) {
    return;
  }
  if (game === null || !game) {
    return ;
  }
  if (game.dicevalue !== 6) {
    return;
  } else if (game.chal !== chal) {
    return;
  } else if (game[chal][id] !== -1) {
    return;
  } else if (game.isdice === true || game.roll === true) {
    return;
  } else {
    const stop = [0, 13, 26, 39];
    let bar = game[chal];
    bar[id] = stop[chal];
    dispatch({
      type: 'UPDATE_OFLINE',
      payload: {
        [chal]: bar,
      },
    });
  }
};

export const chaldibe = async (chal, gameid, id, game, dispatch) => {
  if (chal === undefined || gameid === undefined || id === undefined) {
    return 'chal | gameid | id is undefined';
  }

  // return false;

  if (game.isdice === true || game.givechal === false || game.roll === true) {
    return 'isdice | givechal | roll';
  } else if (game.chal !== chal) {
    return 'game.chal!=chal';
  } else {
    let bar = game[chal];
    let z = game[0];
    let o = game[1];
    let t = game[2];
    let h = game[3];
    let nxt = nextPos(chal, bar[id], game.dicevalue);
    if (!toPossible(chal, nxt)) {
      return 'not possible';
    } else {
      await goFromTo(chal, gameid, bar[id], nxt, bar, id, z, o, t, h, dispatch);
      return true;
    }
  }
};

const goFromTo = async (
  color,
  gameid,
  from,
  to,
  bar,
  id,
  z,
  o,
  t,
  h,
  dispatch,
) => {
  if (checkStopich(to)) {
    bar[id] = to;
    dispatch({
      type: 'UPDATE_OFLINE',
      payload: {
        [color]: bar,
      },
    });
    return;
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
      }
      if (cnt === 1) {
        for (let i = 0; i < 4; i++) {
          if (to === t[i]) {
            t[i] = -1;
            katse = [2, i];
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
    dispatch({
      type: 'UPDATE_OFLINE',
      payload: {
        0: z,
        2: t,
        3: h,
        1: o,
        [color]: bar,
      },
    });

    return;
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

const nextPos = (color, from, dicevalue) => {
  let pos = 0;
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
