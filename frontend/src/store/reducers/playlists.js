import * as actionTypes from '../actions/actionTypes';

const initialState = {
  song: null,
  playlists: [],
};

const playlistsSave = (state, action) => {
  const newState = {
    ...state,
    playlists: action.playlists,
  };
  return newState;
};

const playlistStart = (state, action) => {
  const newState = {
    ...state,
    song: action.song,
  };
  return newState;
};

const playlistEnd = (state, action) => {
  const newState = {
    ...state,
    song: null,
  };
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYLIST_SAVE:
      return playlistsSave(state, action);

    case actionTypes.PLAYLIST_START:
      return playlistStart(state, action);

    case actionTypes.PLAYLIST_END:
      return playlistEnd(state, action);

    default:
      return state;
  }
};

export default reducer;
