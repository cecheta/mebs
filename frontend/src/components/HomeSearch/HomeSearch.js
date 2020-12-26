import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './HomeSearch.scss';

const HomeSearch = ({ suggestion }) => {
  const [query, setQuery] = useState('');

  const history = useHistory();

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    history.push(`/search?q=${encodeURIComponent(query)}&type=all`);
  };

  return (
    <div className="HomeSearch">
      <h1>Mebs</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="query" placeholder={`Search for ${suggestion ? suggestion : '...'}`} value={query} onChange={queryChangeHandler} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default HomeSearch;
