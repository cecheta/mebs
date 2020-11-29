import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  loggedIn: false,
  error: false,
  loaded: false,
};

const authSaveToken = (state, action) => {
  const newState = {
    ...state,
    token: action.token,
  };

  return newState;
};

const authLoadFinish = (state, action) => {
  const newState = {
    ...state,
    loaded: true,
  };

  return newState;
};

const authLogout = (state, action) => {
  const newState = {
    ...initialState,
  }

  return newState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SAVE_TOKEN:
      return authSaveToken(state, action);
    case actionTypes.AUTH_LOAD_FINISH:
      return authLoadFinish(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
