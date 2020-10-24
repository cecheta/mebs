import * as actionTypes from '../actions/actionTypes';

const initialState = {
  artists: [],
};

const addArtist = (state, action) => {
  const newState = { ...state };
  newState.artists = [...state.artists, action.id];
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ARTIST:
      return addArtist(state, action);

    default:
      return state;
  }
};

export default reducer;
