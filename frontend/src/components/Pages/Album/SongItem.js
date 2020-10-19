import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SongItem.module.scss';

const SongItem = ({ data, artists }) => {
  let songArtists = data.artists.map((artist) => ({
    name: artist.name,
    id: artist.id,
  }));
  songArtists = songArtists.filter((artist) => !artists.includes(artist.name));
  songArtists = songArtists.map((artist, i, arr) => {
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
      <span className={classes.number}>{data.track_number}.</span>
      {data.name}
      {songArtists}
    </div>
  );
};

export default SongItem;
