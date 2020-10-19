import React from 'react';
import Song from './Song/Song';
import classes from './Songs.module.scss';

const Songs = ({ songs }) => {
  const songsElements = songs.map((song) => <Song key={song.id} name={song.name} artists={song.artists} image={song.album.images[1]} />);

  return <div className={classes.Songs}>{songsElements}</div>;
};

export default Songs;
