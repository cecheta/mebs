import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/auth';
import favouritesReducer from './reducers/favourites';
import playlistsReducer from './reducers/playlists';

const configureStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    favourites: favouritesReducer,
    playlists: playlistsReducer,
  });
  const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(rootReducer, composedEnhancers);

  store.subscribe(() => {
    const favourites = store.getState().favourites;
    const data = { ...favourites };
    delete data.loaded;
    localStorage.setItem('favouritesState', JSON.stringify(data));
  });

  return store;
};

export default configureStore;
