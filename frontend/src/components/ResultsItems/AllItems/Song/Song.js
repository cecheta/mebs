import React from 'react';
import classes from './Song.module.scss';

const Song = ({ data }) => {
  let artists = data.artists;
  artists = artists.map((artist) => artist.name);

  return (
    <div className={classes.Song}>
      <img src={data.album.images[2].url} alt="" />
      <div className="info">
        <h4>{data.name}</h4>
        <h5>{artists.join(', ')}</h5>
      </div>
    </div>
  );
};

export default Song;
