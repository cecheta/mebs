import * as actionTypes from '../actions/actionTypes';

const initialState = {
  addingStart: false,
};

const playlistStart = (state, action) => {
  const newState = { ...state };
  newState.addingStart = true;
  return newState;
};

const playlistCancel = (state, action) => {
  const newState = { ...state };
  newState.addingStart = false;
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYLIST_START:
      return playlistStart(state, action);

    case actionTypes.PLAYLIST_CANCEL:
      return playlistCancel(state, action);

    default:
      return state;
  }
};

export default reducer;
