import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  loggedIn: false,
  error: false,
};

const authSaveToken = (state, action) => {
  const newState = {
    ...state,
    token: action.token,
  };

  return newState;
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
