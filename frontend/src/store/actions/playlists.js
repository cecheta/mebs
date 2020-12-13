import axios from 'axios';
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

export const playlistAddSong = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const payload = { song: state.playlists.song };
    try {
      await axios.post(`/api/playlists/add/${id}`, payload);
    } catch (err) {
      console.log(err);
  } finally {
      dispatch(playlistEnd());
    }
  };
};

export const playlistDelete = (id) => {
  return {
    type: actionTypes.PLAYLIST_DELETE,
    id,
  };
};

export const playlistDeleteSong = (songId, playlistId) => {
  return {
    type: actionTypes.PLAYLIST_DELETE_SONG,
    songId,
    playlistId,
  };
};

export const playlistEnd = () => {
  return {
    type: actionTypes.PLAYLIST_END,
  };
};
