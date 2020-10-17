import React from 'react';
import SongItem from './SongItem';
import classes from './Album.module.scss';

const Album = ({ data }) => {
  const artists = data.artists.map((artist) => artist.name);
  const tracks = data.tracks.items.map((track) => <SongItem key={track.id} data={track} artists={artists} />);

  return (
    <div className={classes.Album}>
      <div className={classes.Header}>
        <img src={data?.images[0].url} alt="" />
        <div className={classes.Info}>
          <h2>{data.name}</h2>
          <h3>{artists.join(', ')}</h3>
        </div>
      </div>
      {tracks}
    </div>
  );
};

export default Album;
