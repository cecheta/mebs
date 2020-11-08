import * as actionTypes from './actionTypes';

export const playlistStart = () => {
  return {
    type: actionTypes.PLAYLIST_START,
  };
};


export const playlistCancel = () => {
  return {
    type: actionTypes.PLAYLIST_CANCEL,
  };
};
