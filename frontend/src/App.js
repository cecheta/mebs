import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Home from './containers/Home/Home';
import SearchResultsPage from './containers/SearchResultsPage/SearchResultsPage';
import ResultPage from './containers/ResultPage/ResultPage';
import Playlist from './containers/Playlist/Playlist';
import Account from './containers/Account/Account';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Register from './containers/Auth/Register/Register';
import Navigation from './components/Navigation/Navigation';
import * as actions from './store/actions';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loaded, token } = useSelector(
    (state) => ({
      loaded: state.auth.loaded,
      token: state.auth.token,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.authLoadRefresh());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(actions.loadFavourites());
      // dispatch(actions.loadPlaylists(data?.playlists));
    }
  }, [dispatch, token]);

  const logoutListener = (e) => {
    if (e.key === 'loggedin' && !e.newValue) {
      dispatch(actions.authLogout());
      history.push('/');
    }
  };

  useEffect(() => {
    window.addEventListener('storage', logoutListener);
    return () => {
      window.removeEventListener('storage', logoutListener);
    };
  });

  return (
    <div className="App">
      <Navigation />
      {loaded ? (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/search" component={SearchResultsPage} />
          <Route path="/account/playlist/:id" component={Playlist} />
          <Route path="/account" component={Account} />
          <Route path="/r/:type/:id" component={ResultPage} />
          <Route path="/" component={Home} />
        </Switch>
      ) : null}
    </div>
  );
};

export default App;
