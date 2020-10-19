import React from 'react';
import Song from './Song/Song';
import classes from './Songs.module.scss';

const Songs = ({ data }) => {
  const songs = data.map((song) => <Song key={song.id} data={song} />);

  return <div className={classes.Songs}>{songs}</div>;
};

export default Songs;
