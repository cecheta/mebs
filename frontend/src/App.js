import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './containers/Home/Home';
import SearchResultsPage from './containers/SearchResultsPage/SearchResultsPage';
import ResultPage from './containers/ResultPage/ResultPage';
import Playlist from './containers/Playlist/Playlist';
import Account from './containers/Account/Account';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import Navigation from './components/Navigation/Navigation';
import * as actions from './store/actions';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let data;
    try {
      data = localStorage.getItem('data');
      data = JSON.parse(data);
    } catch (e) {}

    dispatch(actions.loadFavourites(data?.favourites));
    dispatch(actions.loadPlaylists(data?.playlists));
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/account/playlist/:id" component={Playlist} />
        <Route path="/account" component={Account} />
        <Route path="/r/:type/:id" component={ResultPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
