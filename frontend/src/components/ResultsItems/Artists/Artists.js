import React from 'react';
import Artist from './Artist/Artist';
import classes from './Artists.module.scss';

const Artists = ({ data }) => {
  const artists = data.map((artist) => <Artist key={artist.id} data={artist} />);

  return <div className={classes.Artists}>{artists}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.data.length === nextProps.data.length;
}

export default React.memo(Artists, areEqual);
