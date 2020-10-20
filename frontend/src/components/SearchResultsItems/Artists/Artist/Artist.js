import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Artist.module.scss';

const Artist = ({ id, name, image }) => {
  return (
    <Link to={`/r/artist/${id}`}>
      <div className={classes.Artist}>
        {image ? <img src={image.url} alt="" /> : null}
        <h3>{name}</h3>
      </div>
    </Link>
  );
};

export default Artist;
