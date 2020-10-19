import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Album.module.scss';

const Album = ({ id, name, artists, image }) => {
  const albumArtists = artists.map((artist) => artist.name);

  return (
    <Link to={`/r/album/${id}`}>
      <div className={classes.Album}>
        {image ? <img src={image.url} alt="" /> : null}
        <div className={classes.Info}>
          <h3>{name}</h3>
          <h4>{albumArtists.join(', ')}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Album;
