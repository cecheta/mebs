import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
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

const authClearToken = (state, action) => {
  const newState = {
    ...initialState,
    loaded: true,
  }

  return newState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SAVE_TOKEN:
      return authSaveToken(state, action);
    case actionTypes.AUTH_LOAD_FINISH:
      return authLoadFinish(state, action);
    case actionTypes.AUTH_CLEAR_TOKEN:
      return authClearToken(state, action);
    default:
      return state;
  }
};

export default reducer;
