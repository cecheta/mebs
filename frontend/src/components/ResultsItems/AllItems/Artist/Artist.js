import React from 'react';
import classes from './Artist.module.scss';

const Artist = ({ data }) => {
  return (
    <div className={classes.Artist}>
      {data.images.length > 0 ? <img src={data.images[2].url} alt=""/> : null}
      <h4>{data.name}</h4>
    </div>
  );
};

export default Artist;