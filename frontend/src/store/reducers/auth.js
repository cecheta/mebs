import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  loggedIn: false,
};

const authSaveToken = (state, action) => {
  return {
    token: action.token,
    loggedIn: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SAVE_TOKEN:
      return authSaveToken(state, action);
    default:
      return state;
  }
};

export default reducer;
