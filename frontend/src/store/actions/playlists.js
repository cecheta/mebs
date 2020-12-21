import axios from 'axios';
import * as actionTypes from './actionTypes';

export const playlistFetch = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/playlists');
    const playlists = response.data;

    dispatch(playlistSave(playlists));
  };
};

const playlistSave = (playlists) => {
  return {
    type: actionTypes.PLAYLIST_SAVE,
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

export const playlistEnd = () => {
  return {
    type: actionTypes.PLAYLIST_END,
  };
};
