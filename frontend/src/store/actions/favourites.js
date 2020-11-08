import * as actionTypes from './actionTypes';

export const loadFavourites = () => {
  return {
    type: actionTypes.LOAD_FAVOURITES,
  };
};

export const addArtist = (id) => {
  return {
    type: actionTypes.ADD_ARTIST,
    id,
  };
};

export const removeArtist = (id) => {
  return {
    type: actionTypes.REMOVE_ARTIST,
    id,
  };
};

export const addAlbum = (id) => {
  return {
    type: actionTypes.ADD_ALBUM,
    id,
  };
};

export const removeAlbum = (id) => {
  return {
    type: actionTypes.REMOVE_ALBUM,
    id,
  };
};