const init = {
  settings: false,
  gameOptions: false,
};

export const ModalReducer = (state = init, action = {}) => {
  switch (action.type) {
    case 'MODAL_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };
    case 'MODAL_GAMEOPTIONS':
      return {
        ...state,
        gameOptions: action.payload,
      };
    case 'CLEAR_ALL_MODAL' : 
    return {
      state,
      settings : false,
      gameOptions : false,
    }
    default:
      return state;
  }
};
