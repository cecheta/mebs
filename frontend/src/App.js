import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import SearchResultsPage from './containers/SearchResultsPage/SearchResultsPage';
import AlbumPage from './containers/AlbumPage/AlbumPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/album/:id" component={AlbumPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
