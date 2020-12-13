import * as actionTypes from '../actions/actionTypes';

const initialState = {
  addingStart: false,
  playlists: [],
  song: null,
  loaded: false,
};

const playlistStart = (state, action) => {
  const newState = {
    ...state,
    addingStart: true,
    song: action.song,
  };
  return newState;
};

const playlistAddSong = (state, action) => {
  const newState = {
    ...state,
    addingStart: false,
  };
  return newState;
};

const playlistDelete = (state, action) => {
  const newState = {
    ...state,
    playlists: state.playlists.filter((playlist) => playlist.id !== action.id),
  };
  return newState;
};

const playlistDeleteSong = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  const playlist = newState.playlists.find((playlist) => playlist.id === action.playlistId);
  playlist.songs = playlist.songs.filter((song) => song.id !== action.songId);
  return newState;
};

const playlistEnd = (state, action) => {
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

    case actionTypes.PLAYLIST_ADD_SONG:
      return playlistAddSong(state, action);

    case actionTypes.PLAYLIST_DELETE:
      return playlistDelete(state, action);

    case actionTypes.PLAYLIST_DELETE_SONG:
      return playlistDeleteSong(state, action);

    case actionTypes.PLAYLIST_END:
      return playlistEnd(state, action);

    default:
      return state;
  }
};

export default reducer;
