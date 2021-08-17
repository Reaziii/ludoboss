import {newGameData} from '../../Utils/newGameData';

const inti = {
  game: {...newGameData},
  gameid: null,
  pos: new Array(100).fill(1),
  0: [-1, -1, -1, -1],
  1: [-1, -1, -1, -1],
  2: [-1, -1, -1, -1],
  3: [-1, -1, -1, -1],
  katatime: null,
  postotal: new Array(100).fill(0),
  chal: 0,
  katagese: null,
  opendone: false,
  price: null,
  person: [],
  gameuserdata: {},
};
export const gameReducer = (state = inti, action = {}) => {
  switch (action.type) {
    case 'AR':
      return {
        ...state,
      };
    case 'UPDATE_GAME':
      return {
        ...state,
        game: action.payload,
      };
    case 'UPDATE_OPP0':
      return {
        ...state,
        0: [...action.payload],
      };

    case 'UPDATE_OPP2':
      return {
        ...state,
        2: [...action.payload],
      };
    case 'UPDATE_OPP1':
      return {
        ...state,
        1: [...action.payload],
      };
    case 'UPDATE_OPP3':
      return {
        ...state,
        3: [...action.payload],
      };
    case 'KATA_TIME':
      return {
        ...state,
        katatime: action.payload,
      };
    case 'UPDATE_POST':
      return {
        ...state,
        postotal: [...action.payload],
      };

    case 'TEST_P':
      return {
        ...state,
        chal: action.payload,
      };
    case 'KATA_GESE':
      return {
        ...state,
        katagese: {
          ...action.payload,
        },
      };
    case 'REMOVE_KATA_GESE':
      return {
        ...state,
        katagese: null,
      };
    case 'OPEN_DONE':
      return {
        ...state,
        opendone: action.payload,
      };

    case 'UPDATE_OFLINE':
      return {
        ...state,
        game: {
          ...state.game,
          ...action.payload,
        },
      };
    case 'SEARCH_GAME':
      return {
        ...state,
        price: action.payload,
      };
    case 'NEW_GAMEID':
      return {
        ...state,
        gameid: action.payload,
      };
    case 'SEARCH_PERSON':
      return {
        ...state,
        person: [...action.payload],
      };
    case 'CLEAR_GAME_DATA':
      return {
        ...state,
        game: {...newGameData},
        gameid: null,
        pos: new Array(100).fill(1),
        0: [-1, -1, -1, -1],
        1: [-1, -1, -1, -1],
        2: [-1, -1, -1, -1],
        3: [-1, -1, -1, -1],
        katatime: null,
        postotal: new Array(100).fill(0),
        chal: 0,
        katagese: null,
        opendone: false,
        price: null,
        person: [],
        gameuserdata : {},
      };
    case 'GAME_USER_DATA':
      return {
        ...state,
        gameuserdata: action.payload,
      };
    default:
      return state;
  }
};
