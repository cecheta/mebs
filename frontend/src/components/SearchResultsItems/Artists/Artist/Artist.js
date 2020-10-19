import React from 'react';
import classes from './Artist.module.scss';

const Artist = ({ data }) => {
  return (
    <div className={classes.Artist}>
      <img src={data.images[2]?.url} alt="" />
      <h3>{data.name}</h3>
    </div>
  );
};

export default Artist;
