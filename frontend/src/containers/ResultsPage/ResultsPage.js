import React, { useState, useRef } from 'react';
import { withRouter, Redirect, Switch } from 'react-router-dom';
import Tabs from '../../components/Tabs/Tabs';
import Results from './Results/Results';
import './ResultsPage.scss';

const ResultsPage = (props) => {
  const queryString = props.location.search;
  const searchParams = new URLSearchParams(queryString);
  const q = searchParams.get('q');
  const type = searchParams.get('type');
  const valid = type === 'all' || type === 'artist' || type === 'album' || type === 'track';

  const [text, setText] = useState(q);
  const [query, setQuery] = useState(q);

  let timer = useRef(null);

  const changeHandler = (e) => {
    const input = e.target.value;
    setText(input);

    if (input !== '') {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setQuery(input);
      }, 300);
    }
  };

  return (
    <div className="ResultsPage">
      <Switch>
        {!q ? <Redirect to="/" /> : null}
        {!valid ? <Redirect to={`/search?q=${q}&type=all`} /> : null}
      </Switch>
      <Tabs />
      <input value={q ? text : ''} onChange={changeHandler} />
      <Results query={query} type={type} key={query} valid={valid} />
    </div>
  );
};

export default withRouter(ResultsPage);
