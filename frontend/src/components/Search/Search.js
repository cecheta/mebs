import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.scss';

const HomeSearch = (props) => {
  const [query, setQuery] = useState('');

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    props.history.push(`/search?q=${encodeURIComponent(query)}&type=all`);
  };

  return (
    <div className="HomeSearch">
      <h1>Mebs</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="query" placeholder="Search" value={query} onChange={queryChangeHandler} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default withRouter(HomeSearch);
