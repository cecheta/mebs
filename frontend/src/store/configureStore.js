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
    const playlists = store.getState().playlists;
    const favouritesData = { ...favourites };
    const playlistsData = { ...playlists };

    delete favouritesData.loaded;
    delete playlistsData.loaded;
    delete playlistsData.addingStart;
    delete playlistsData.song;

    const data = {
      favourites: favouritesData,
      playlists: playlistsData,
    };

    try {
      localStorage.setItem('data', JSON.stringify(data));
    } catch (e) {}
  });

  return store;
};

export default configureStore;
