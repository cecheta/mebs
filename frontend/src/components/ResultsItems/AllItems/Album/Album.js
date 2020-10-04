import React from 'react';
import classes from './Album.module.scss';

const Album = ({ data }) => {
  return (
    <div className={classes.Album}>
      <img src={data.images[1].url} alt=""/>
      <h4>{data.name}</h4>
    </div>
  );
};

export default Album;