import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Artist.module.scss';

const Artist = ({ id, name, image }) => {
  return (
    <Link to={`/artist/${id}`}>
      <div className={classes.Artist}>
        {image ? <img src={image.url} alt="" /> : null}
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

export default Artist;
