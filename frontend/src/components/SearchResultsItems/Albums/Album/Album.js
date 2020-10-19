import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Album.module.scss';

const Album = ({ data }) => {
  const artists = data.artists.map((artist) => artist.name);

  return (
    <Link to={`/album/${data.id}`}>
      <div className={classes.Album}>
        <img src={data.images[1]?.url} alt="" />
        <div className={classes.Info}>
          <h3>{data.name}</h3>
          <h4>{artists.join(', ')}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Album;
