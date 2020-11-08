import * as actionTypes from './actionTypes';

export const playlistStart = (song) => {
  return {
    type: actionTypes.PLAYLIST_START,
    song
  };
};


export const playlistCancel = () => {
  return {
    type: actionTypes.PLAYLIST_CANCEL,
  };
};
