import * as actionTypes from './actionTypes';

export const loadPlaylists = (playlists) => {
  return {
    type: actionTypes.LOAD_PLAYLISTS,
    playlists,
  };
};

export const playlistStart = (song) => {
  return {
    type: actionTypes.PLAYLIST_START,
    song,
  };
};

export const playlistAdd = (name, id) => {
  return {
    type: actionTypes.PLAYLIST_ADD,
    name,
    id,
  };
};

export const playlistAddSong = (id) => {
  return {
    type: actionTypes.PLAYLIST_ADD_SONG,
    id,
  };
};

export const playlistCancel = () => {
  return {
    type: actionTypes.PLAYLIST_CANCEL,
  };
};
