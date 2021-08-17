export const open_settings = () => ({
  type: 'MODAL_SETTINGS',
  payload: true,
});

export const close_settings = () => ({
  type: 'MODAL_SETTINGS',
  payload: false,
});

export const open_gameoptions = () => ({
  type: 'MODAL_GAMEOPTIONS',
  payload: true,
});

export const close_gameoptions = () => ({
  type: 'MODAL_GAMEOPTIONS',
  payload: false,
});

export const clear_all_modal = () => ({
  type: 'CLEAR_ALL_MODAL',
});
