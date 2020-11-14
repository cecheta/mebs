import * as actionTypes from '../actions/actionTypes';

const initialState = {
  addingStart: false,
  playlists: [],
  song: null,
};

const loadPlaylists = (state, action) => {
  let newState = { ...state };
  if (action.playlists) {
    newState = action.playlists;
  }

  return newState;
};

const playlistStart = (state, action) => {
  const newState = {
    ...state,
    addingStart: true,
    song: action.song,
  };
  return newState;
};

const playlistAdd = (state, action) => {
  const newState = {
    ...state,
    playlists: [
      ...state.playlists,
      {
        id: action.id,
        name: action.name,
        songs: [],
      },
    ],
  };
  return newState;
};

const playlistAddSong = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  const playlist = newState.playlists.find((playlist) => playlist.id === action.id);
  playlist.songs.push(state.song);
  newState.song = null;
  newState.addingStart = false;
  return newState;
};

const playlistCancel = (state, action) => {
  const newState = {
    ...state,
    addingStart: false,
    song: null,
  };
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYLIST_START:
      return playlistStart(state, action);

    case actionTypes.LOAD_PLAYLISTS:
      return loadPlaylists(state, action);

    case actionTypes.PLAYLIST_ADD:
      return playlistAdd(state, action);

    case actionTypes.PLAYLIST_ADD_SONG:
      return playlistAddSong(state, action);

    case actionTypes.PLAYLIST_CANCEL:
      return playlistCancel(state, action);

    default:
      return state;
  }
};

export default reducer;
