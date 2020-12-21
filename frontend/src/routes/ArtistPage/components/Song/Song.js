import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Song.module.scss';

const Song = ({ name, image, album }) => {
  return (
    <Link to={`/r/album/${album.id}`}>
      <div className={classes.Song}>
        {image ? <img className={classes.SongImage} src={image.url} alt="" /> : null}
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

export default Song;
