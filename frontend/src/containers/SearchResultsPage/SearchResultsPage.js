import React, { useState, useRef, useEffect } from 'react';
import { withRouter, Redirect, Switch } from 'react-router-dom';
import Tabs from '../../components/Tabs/Tabs';
import Results from './SearchResults/SearchResults';
import './SearchResultsPage.scss';

const SearchResultsPage = (props) => {
  const queryString = props.location.search;
  const searchParams = new URLSearchParams(queryString);
  const q = searchParams.get('q');
  const type = searchParams.get('type');
  const valid = type === 'all' || type === 'artist' || type === 'album' || type === 'track';

  const [text, setText] = useState(q);
  const [query, setQuery] = useState(q);

  const timerRef = useRef(null);
  const inputChangedRef = useRef(false);

  if (q !== text && !inputChangedRef.current) {
    setText(q);
    setQuery(q);
  }

  const changeHandler = (e) => {
    const input = e.target.value;
    inputChangedRef.current = true;
    setText(input);
    
    if (input !== '') {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const queryString = props.location.search.replace(encodeURIComponent(q), encodeURIComponent(input));
        props.history.push(`/search${queryString}`);
        inputChangedRef.current = false;
        setQuery(input);
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="SearchResultsPage">
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

export default withRouter(SearchResultsPage);
