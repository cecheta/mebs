import React from 'react';
import classes from './Artist.module.scss';

const Artist = ({ name, image }) => {
  return (
    <div className={classes.Artist}>
      {image ? <img src={image.url} alt="" /> : null}
      <h3>{name}</h3>
    </div>
  );
};

export default Artist;
