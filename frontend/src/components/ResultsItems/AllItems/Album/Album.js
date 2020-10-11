import React from 'react';
import classes from './Album.module.scss';

const Album = ({ data }) => {
  const artists = data.artists.map((artist) => artist.name);

  return (
    <div className={classes.Album}>
      <img src={data.images[1].url} alt="" />
      <h4>{data.name}</h4>
      <h5>{artists.join(', ')}</h5>
    </div>
  );
};

export default Album;
