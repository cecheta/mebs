import axios from 'axios';
import * as actionTypes from './actionTypes';

export const loadFavourites = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/favourites');
    const favourites = response.data.favourites;
    dispatch(saveFavourites(favourites));
  }
};

export const saveFavourites = (favourites) => {
  return {
    type: actionTypes.LOAD_FAVOURITES,
    favourites,
  };
};

export const clearFavourites = () => {
  return {
    type: actionTypes.CLEAR_FAVOURITES,
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
