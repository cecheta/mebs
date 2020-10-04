import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeSearch from './components/Search/HomeSearch';
import './App.scss';

function App() {
  return <div className="App">
    <Switch>
      <Route path="/" component={HomeSearch} />
    </Switch>
  </div>;
}

export default App;
