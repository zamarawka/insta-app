const currentUser = (state = { user: null, token: null, forceLogin: false }, action) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
        token: action.token
      };

    case 'LOGOUT':
      return { user: null };

    case 'REGISTRATION':
      return { user: action.user };

    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: action.isFollow ?
            state.user.following.filter((user) => user !== action.userId) :
            state.user.following.concat(action.userId)
        }
      };

    case 'NEW_POST':
      return state;

    case 'EDIT_INFO':
      return {
        user: action.user
      };

    default:
      return state;
  }
}

export default currentUser;