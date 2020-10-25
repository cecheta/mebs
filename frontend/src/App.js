import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './containers/Home/Home';
import SearchResultsPage from './containers/SearchResultsPage/SearchResultsPage';
import ResultPage from './containers/ResultPage/ResultPage';
import * as actions from './store/actions';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadFavourites());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/r/:type/:id" component={ResultPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
