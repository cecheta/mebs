import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Item.module.scss';

const SongItem = ({ name, image, album }) => {
  return (
    <Link to={`/r/album/${album.id}`}>
      <div className={classes.Item}>
        {image ? <img className={classes.ItemImage} src={image.url} alt="" /> : null}
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

export default SongItem;