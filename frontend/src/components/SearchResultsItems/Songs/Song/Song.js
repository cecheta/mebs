import React from 'react';
import classes from './Song.module.scss';

const Song = ({ name, artists, image }) => {
  const songArtists = artists.map((artist) => artist.name);

  return (
    <div className={classes.Song}>
      {image ? <img src={image.url} alt="" /> : null}
      <div className="info">
        <h4>{name}</h4>
        <h5>{songArtists.join(', ')}</h5>
      </div>
    </div>
  );
};

export default Song;