const init = {
  sound: true,
  menu_music: false,
  menu_music_playing : false,
};

export const settingsReducer = (state = init, action = {}) => {
  switch (action.type) {
    case 'SOUND_OFF':
      return {
        ...state,
        sound: false,
      };
    case 'SOUND_ON':
      return {
        ...state,
        sound: true,
      };
    case 'MENU_MUSIC':
      return {
        ...state,
        menu_music: !state.menu_music,
      };
    case 'MENU_MUSIC_PLAY' : 
    return {
      ...state,
      menu_music_playing : !state.menu_music_playing
    }
    
    default:
      return state;
  }
};
