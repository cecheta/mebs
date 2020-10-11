import React from 'react';
import Album from './Album/Album';
import classes from './Albums.module.scss';

const Albums = ({ data }) => {
  const albums = data.map((album) => <Album key={album.id} data={album} />);

  return <div className={classes.Albums}>{albums}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.data.length === nextProps.data.length;
};

export default React.memo(Albums, areEqual);
