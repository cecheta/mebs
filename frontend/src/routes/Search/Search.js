import React, { useState, useRef, useEffect } from 'react';
import { Redirect, Switch, useLocation, useHistory } from 'react-router-dom';
import Input from '../../components/UI/Input';
import Tabs from '../../components/Tabs';
import Results from '../../components/SearchResults';
import classes from './Search.module.scss';

const Search = () => {
  const timerRef = useRef(null);
  const inputChangedRef = useRef(false);

  const location = useLocation();
  const history = useHistory();

  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const q = searchParams.get('q');
  const type = searchParams.get('type');
  const valid = type === 'all' || type === 'artist' || type === 'album' || type === 'track';

  const [text, setText] = useState(q);
  const [query, setQuery] = useState(q);

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
        const queryString = location.search.replace(encodeURIComponent(q), encodeURIComponent(input));
        history.push(`/search${queryString}`);
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
    <div className={classes.Search}>
      <Switch>
        {!q ? <Redirect to="/" /> : null}
        {!valid ? <Redirect to={`/search?q=${q}&type=all`} /> : null}
      </Switch>
      <Tabs />
      <div className={classes.Search__Input}>
        <Input value={q ? text : ''} onChange={changeHandler} />
      </div>
      <Results query={query} type={type} key={query} valid={valid} />
    </div>
  );
};

export default Search;
