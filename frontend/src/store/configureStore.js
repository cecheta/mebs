import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/auth';
import favouritesReducer from './reducers/favourites';

const configureStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    favourites: favouritesReducer,
  });
  const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(rootReducer, composedEnhancers);

  store.subscribe(() => {
    const favourites = store.getState().favourites;
    localStorage.setItem('favouritesState', JSON.stringify(favourites));
  });

  return store;
};

export default configureStore;
