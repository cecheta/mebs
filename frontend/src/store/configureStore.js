import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/auth';
import favouritesReducer from './reducers/favourites';

const configureStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    favourites: favouritesReducer,
  });
  const composedEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware));
  const store = createStore(rootReducer, composedEnhancers);

  return store;
};

export default configureStore;
