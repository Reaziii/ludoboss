const init = {
  reversestart: false,
};

export const ReverseReducer = (state = init, action) => {
  switch (action.type) {
    case 'REVERSE_OPEN':
      return {
        ...state,
        reversestart: true,
      };
    case 'REVERSE_CLOSE':
      return {
        ...state,
        reversestart: false,
      };
    default:
      return state;
  }
};
