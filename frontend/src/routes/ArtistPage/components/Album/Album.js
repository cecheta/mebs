import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Album.module.scss';

const Album = ({ id, name, image }) => {
  return (
    <Link to={`/album/${id}`}>
      <div className={classes.Album}>
        {image ? <img className={classes.AlbumImage} src={image.url} alt="" /> : null}
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

export default Album;
