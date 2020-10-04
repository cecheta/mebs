import React, { useState } from 'react';
import './HomeSearch.scss';

const HomeSearch = (props) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('album,artist,track');

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };

  const submitHandler = async (e) => {
      e.preventDefault();
    // try {
    //   const response = await fetch(`/api/search?q=${query}&type=${type}`);
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
    props.history.push(`/search?q=${query}&type=${type}`);
  };

  return (
    <div className="HomeSearch">
      <h1>Mebs</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="query" placeholder="Search" value={query} onChange={queryChangeHandler} />
        <select name="cars" value={type} onChange={typeChangeHandler}>
          <option value="album,artist,track">All</option>
          <option value="album">Albums</option>
          <option value="artist">Artists</option>
          <option value="track">Songs</option>
        </select>
        <button>Search</button>
      </form>
    </div>
  );
};

export default HomeSearch;
