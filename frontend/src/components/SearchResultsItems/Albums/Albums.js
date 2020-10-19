import React from 'react';
import Album from './Album/Album';
import classes from './Albums.module.scss';

const Albums = ({ albums }) => {
  const albumsElements = albums.map((album) => <Album key={album.id} id={album.id} name={album.name} artists={album.artists} image={album.images[1]} />);

  return <div className={classes.Albums}>{albumsElements}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.albums.length === nextProps.albums.length;
};

export default React.memo(Albums, areEqual);
