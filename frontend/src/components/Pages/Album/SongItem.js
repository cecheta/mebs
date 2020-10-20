import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SongItem.module.scss';

const SongItem = ({ name, number, songArtists, albumArtists }) => {
  let artists = songArtists.map((artist) => ({
    name: artist.name,
    id: artist.id,
  }));
  artists = artists.filter((artist) => {
    const artistNames = albumArtists.map((artist) => artist.name);
    return !artistNames.includes(artist.name);
  });
  artists = artists.map((artist, i, arr) => {
    let text = artist.name;
    if (i !== arr.length - 1) {
      text += ',';
    }
    if (i === 0) {
      return (
        <span className={classes.artists} key={artist.id}>
          &nbsp;- <Link to={`/r/artist/${artist.id}`}>{text}</Link>
        </span>
      );
    }
    return (
      <span className={classes.artists} key={artist.id}>
        &nbsp;<Link to={`/r/artist/${artist.id}`}>{text}</Link>
      </span>
    );
  });

  return (
    <div className={classes.SongItem}>
      <h4>
        <span className={classes.number}>{number}.</span>
        {name}
        {artists}
      </h4>
    </div>
  );
};

export default SongItem;
