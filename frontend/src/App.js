import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import SearchResultsPage from './containers/SearchResultsPage/SearchResultsPage';
import ResultPage from './containers/ResultPage/ResultPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/r/:type/:id" component={ResultPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
