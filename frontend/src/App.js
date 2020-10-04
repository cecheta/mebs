import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './containers/Home/Home';
import ResultsPage from './containers/ResultsPage/ResultsPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      {/* Testing */}
      <Link to="/">
        <div style={{ fontSize: '20px', backgroundColor: '#fff', display: 'inline' }}>Home</div>
      </Link>
      {/* Testing */}

      <Switch>
        <Route path="/search" component={ResultsPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
