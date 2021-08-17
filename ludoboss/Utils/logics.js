import { Alert } from 'react-native';
import {board, box} from './board';

const move = (Animated, to, x, y, s, speed) => {
  console.log(to);
  if (!speed) speed = 100;
  Animated.timing(x, {
    toValue: board[to].x,
    duration: speed,
    useNativeDriver: false,
  }).start();
  Animated.timing(y, {
    toValue: board[to].y,
    duration: speed,
    useNativeDriver: false,
  }).start();
  Animated.timing(s, {
    toValue: board[to].s,
    duration: speed,
    useNativeDriver: false,
  }).start();
  return to;
};

// const uthbe = (id, box) => {
//   Animated.timing(x, {
//     toValue: board[0].x,
//     duration: 100,
//     useNativeDriver: false,
//   }).start();
//   Animated.timing(y, {
//     toValue: board[to].y,
//     duration: 100,
//     useNativeDriver: false,
//   }).start();
//   Animated.timing(s, {
//     toValue: board[to].s,
//     duration: 100,
//     useNativeDriver: false,
//   }).start();
// };
export const fromTo = async (
  Animated,
  from,
  to,
  x,
  y,
  s,
  color,
  id,
  dispatch,
  bar,
  mypref,
  mypos,
  useSelector,
) => {
  if (
    from === to ||
    from === undefined ||
    to === undefined ||
    from === null ||
    to === null ||
    to === -1
  )
    return;
  if (from === -1) {
    await move(Animated, to, x, y, s, 200);
    let bb = bar;
    bb[id] = to;
    dispatch({
      type: 'UPDATE_OOP' + color,
      payload: [...bb],
    });
    return;
  }

  let ab = await setInterval(async () => {
    if (from === to) {
      let bb = bar;
      bb[id] = to;
      dispatch({
        type: 'UPDATE_OOP' + color,
        payload: [...bb],
      });

      dispatch({
        type: 'REVERSE_OPEN',
      });

      clearInterval(ab);
    } else {
      from = nextPos(color, from, 1);
      console.log(from, to);

      await move(Animated, from, x, y, s);
    }
  }, 150);
  let time = (to - from + 1) * 150;
  return time;
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

const stop = [0, 13, 26, 39];

export const reverse = (Animated, from, color, id, x, y, s) => {
  if (from === -1) return;

  const ab = setInterval(() => {
    if (from === stop[color]) {
      Animated.timing(x, {
        toValue: box[color][id].x,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(y, {
        toValue: box[color][id].y,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(s, {
        toValue: box[color][id].s,
        duration: 100,
        useNativeDriver: false,
      }).start();
      clearInterval(ab);
    } else {
      from -= 1;
      if (from === -1) from = 51;
      return move(Animated, from, x, y, s, 50);
    }
  }, 50);
};

export const InPosTotal = (game, pos, color, id) => {
  let cnt = 0;
  let get = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (pos !== -1 && pos === game[i][j]) cnt++;
      if (color === i && id === j) {
        get = cnt;
      }
    }
  }
  return {cnt, get};
};

export const changeToMini = (Animated, x, y, s, to, i) => {
  let a = board[to].x;
  let b = board[to].y;
  Animated.timing(s, {
    toValue: 0.3,
    duration: 50,
    useNativeDriver: false,
  }).start();

  let j = i;
  if (i > 6) {
    j = i - 6;
  } else if (i > 3) {
    j = i - 3;
  }
  Animated.timing(x, {
    toValue: a + j * 8 - 16,
    duration: 50,
    useNativeDriver: false,
  }).start();

  if (i <= 3) {
    Animated.timing(y, {
      toValue: b,
      duration: 50,
      useNativeDriver: false,
    }).start();
  } else if (i <= 6) {
    Animated.timing(y, {
      toValue: b + 6,
      duration: 50,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(y, {
      toValue: b + 12,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }
};

export const changeToMiniBoardLeft = (Animated, y, x, s, to, i) => {
  let a = board[to].y;
  let b = board[to].x;
  Animated.timing(s, {
    toValue: 0.3,
    duration: 50,
    useNativeDriver: false,
  }).start();

  let j = i;
  // if(i>6){
  //   j = i-6;
  // }
  // else if(i>3){
  //   j = i-3;
  // }
  Animated.timing(x, {
    toValue: a + j * 8 - 16,
    duration: 50,
    useNativeDriver: false,
  }).start();

  if (i <= 10) {
    Animated.timing(y, {
      toValue: b,
      duration: 50,
      useNativeDriver: false,
    }).start();
  } else if (i <= 6) {
    Animated.timing(y, {
      toValue: b + 6,
      duration: 50,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(y, {
      toValue: b + 12,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }
};

export const changeToMiniBoardUp = (Animated, x, y, s, to, i) => {
  let a = board[to].x;
  let b = board[to].y;
  Animated.timing(s, {
    toValue: 0.3,
    duration: 50,
    useNativeDriver: false,
  }).start();

  let j = i;
  // if(i>6){
  //   j = i-6;
  // }
  // else if(i>3){
  //   j = i-3;
  // }
  Animated.timing(x, {
    toValue: a + j * 8 - 20,
    duration: 50,
    useNativeDriver: false,
  }).start();

  if (i <= 10) {
    Animated.timing(y, {
      toValue: b,
      duration: 50,
      useNativeDriver: false,
    }).start();
  } else if (i <= 6) {
    Animated.timing(y, {
      toValue: b + 6,
      duration: 50,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(y, {
      toValue: b + 12,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }
};
