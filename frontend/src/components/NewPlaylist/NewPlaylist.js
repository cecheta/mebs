import React from 'react';
import { useState } from 'react';
import './NewPlaylist.scss';

const NewPlaylist = (props) => {
  const [name, setName] = useState('');

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <h2>New Playlist</h2>
      <form onSubmit={(e) => props.submit(e, name)}>
        <input type="text" placeholder="Name" value={name} onChange={nameChangeHandler} />
      </form>
    </div>
  );
};

export default NewPlaylist;
