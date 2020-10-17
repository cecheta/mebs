import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import ResultsPage from './containers/ResultsPage/ResultsPage';
import AlbumPage from './containers/AlbumPage/AlbumPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={ResultsPage} />
        <Route path="/album/:id" component={AlbumPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
