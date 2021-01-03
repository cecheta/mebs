import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation';
import Home from '../../routes/Home';
import Search from '../../routes/Search';
import AlbumPage from '../../routes/AlbumPage';
import ArtistPage from '../../routes/ArtistPage';
import Playlist from '../../routes/Playlist';
import Account from '../../routes/Account';
import Login from '../../routes/Login';
import Logout from '../../routes/Logout';
import Register from '../../routes/Register';
import * as actions from '../../store/actions';
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
      {loaded ? (
        <>
          <Navigation />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/search" component={Search} />
            <Route path="/account/playlist/:id" component={Playlist} />
            <Route path="/account" component={Account} />
            <Route path="/album/:id" component={AlbumPage} />
            <Route path="/artist/:id" component={ArtistPage} />
            <Route path="/" component={Home} />
          </Switch>
        </>
      ) : null}
    </div>
  );
};

export default App;
