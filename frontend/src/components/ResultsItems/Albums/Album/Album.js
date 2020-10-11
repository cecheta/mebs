import React from 'react';
import classes from './Album.module.scss';

const Album = ({ data }) => {
  const artists = data.artists.map((artist) => artist.name);

  return (
    <div className={classes.Album}>
      <img src={data.images[1]?.url} alt="" />
      <div className={classes.Info}>
        <h3>{data.name}</h3>
        <h4>{artists.join(', ')}</h4>
      </div>
    </div>
  );
};

export default Album;
