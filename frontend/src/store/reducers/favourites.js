import * as actionTypes from '../actions/actionTypes';

const initialState = {
  artists: [],
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
    case actionTypes.ADD_ARTIST:
      return addArtist(state, action);

    case actionTypes.REMOVE_ARTIST:
      return removeArtist(state, action);

    default:
      return state;
  }
};

export default reducer;
