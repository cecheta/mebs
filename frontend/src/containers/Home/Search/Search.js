import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.scss';

const HomeSearch = (props) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    props.history.push(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  };

  return (
    <div className="HomeSearch">
      <h1>Mebs</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="query" placeholder="Search" value={query} onChange={queryChangeHandler} />
        <select name="cars" value={type} onChange={typeChangeHandler}>
          <option value="all">All</option>
          <option value="album">Albums</option>
          <option value="artist">Artists</option>
          <option value="track">Songs</option>
        </select>
        <button>Search</button>
      </form>
    </div>
  );
};

export default withRouter(HomeSearch);
