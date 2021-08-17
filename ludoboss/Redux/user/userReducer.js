const init = {
  user: null,
  photo : null,
};

const userReducer = (state = init, action = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'USERPHOTO' : 
      return {
        ...state,
        photo : action.payload
      }
    default:
      return state;
  }
};
export default userReducer;
