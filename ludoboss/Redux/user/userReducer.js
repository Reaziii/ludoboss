const init = {
  user: null,
  photo : null,
  data : {},
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
    case 'FULL_USER' : 
      return {
        ...state,
        data : action.payload,
      }
    default:
      return state;
  }
};
export default userReducer;
