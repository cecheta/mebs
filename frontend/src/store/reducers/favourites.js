import * as actionTypes from '../actions/actionTypes';

const initialState = {
  artists: [],
};

const loadFavourites = (state) => {
  try {
    const favourites = localStorage.getItem('favouritesState');
    if (favourites) {
      return JSON.parse(favourites);
    }
  } catch (e) {}

  return state;
};

const addArtist = (state, action) => {
  const newState = { ...state };
  newState.artists = [...state.artists, action.id];
  return newState;
};

const removeArtist = (state, action) => {
  const newState = { ...state };
  const artists = state.artists.filter((id) => id !== action.id);
  newState.artists = artists;
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FAVOURITES:
      return loadFavourites(state);

    case actionTypes.ADD_ARTIST:
      return addArtist(state, action);

    case actionTypes.REMOVE_ARTIST:
      return removeArtist(state, action);

    default:
      return state;
  }
};

export default reducer;
