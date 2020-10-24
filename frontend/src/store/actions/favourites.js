import * as actionTypes from './actionTypes';

export const addArtist = (id) => {
  return {
    type: actionTypes.ADD_ARTIST,
    id,
  };
};
