import React from 'react';
import classes from './Album.module.scss';

const Album = ({ name, artists, image }) => {
  const albumArtists = artists.map((artist) => artist.name);

  return (
    <div className={classes.Album}>
      {image ? <img src={image.url} alt="" /> : null}
      <h4>{name}</h4>
      <h5>{albumArtists.join(', ')}</h5>
    </div>
  );
};

export default Album;
